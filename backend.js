const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const logger = require('morgan')
const errorHandler = require('errorHandler')
const express = require('express')
const path = require('path')

require('dotenv').config()

const app = express()
const port = 4000

app.use(errorHandler())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride())
app.use(logger('combined'))
app.use(express.static(path.join(__dirname, 'public')))

const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  })
}

const linkResolver = ({type, slug}) => {
  const urls = {
    product: `/detail/${slug}`,
    collection_set: '/collections',
    about: `/about`,
    default: '/',
  }
  return urls[type] ?? urls.default
}

app.use((_, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: linkResolver,
  }

  res.locals.PrismicDOM = PrismicDOM
  res.locals.Link = linkResolver
  res.locals.Numbers = (index) =>
    index === 0
      ? 'One'
      : index === 1
      ? 'Two'
      : index === 2
      ? 'three'
      : index === 3
      ? 'Four'
      : ''

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async ({
  req,
  config: {home, collections, about, product} = {
    home: false,
    about: false,
    collections: false,
    product: false,
  },
}) => {
  const api = await initApi(req)
  const customResponse = {
    meta: await api.getSingle('meta'),
    loader: await api.getSingle('loader'),
    navigation: await api.getSingle('navigation'),
    home: !!home && (await api.getSingle('home')),
    about: !!about && (await api.getSingle('about')),
    collections:
      !!collections &&
      (
        await api.query(Prismic.Predicates.at('document.type', 'collection'), {
          fetchLinks: 'product.image',
        })
      ).results,
    product:
      !!product &&
      (await api.getByUID('product', req.params.uid, {
        fetchLinks: 'collection.title',
      })),
  }
  return customResponse
}

app.get('/', async (req, res) => {
  res.render(
    'pages/home',
    await handleRequest({
      req,
      config: {
        home: true,
        collections: true,
      },
    }),
  )
})

app.get('/about', async (req, res) => {
  res.render(
    'pages/about',
    await handleRequest({
      req,
      config: {
        about: true,
      },
    }),
  )
})

app.get('/collections', async (req, res) => {
  res.render(
    'pages/collections',
    await handleRequest({
      req,
      config: {
        collections: true,
        home: true,
      },
    }),
  )
})

app.get('/detail/:uid', async (req, res) => {
  res.render(
    'pages/detail',
    await handleRequest({
      req,
      config: {
        product: true,
        home: true,
      },
    }),
  )
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

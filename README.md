# Earthquakes Map Visualizer

This is a web app showing earthquakes that happen in the world for a specific range of time. The data is obtained from the [USGS](https://earthquake.usgs.gov/fdsnws/event/1/)  and displayed on a map with detailed information.


==Note:== This projects is just a frontend development and uses the USGS API to access to all the data. Therefore, the app loading speeds depend mostly from this API availability (from 0.5s to 30s in my tests). It is recommended to make small queries to reduce load times (not many days in range).

> You can see this project deployed at [here](https://home-5005757081.app-ionos.space/)

### Features
- LocalStorage to save position on map and latest filter properties
- Color coded earthquakes
- Page animation on load
- Collapsible filter panel
- Toast notifications from API errors


# 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Requirements 📋

You need to have [NodeJs](https://nodejs.org/) installed. If you don't have Yarn already need to install it globally: `npm install --global yarn` 

Once you have installed these programs, you need to create an account for: [Mapbox](https://account.mapbox.com/) 

## Installation 🔧

First, you will need to `clone` or `fork` the repository into your Github account:

<img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="Fork on GitHub" width='450'>

`$ git clone https://github.com/mhfortuna/carto-frontend-test.git`

Then run yarn install in the base folder `yarn install`

When you have all the dependencies installed you need to create an `.env` file located in the root of the project with the following content:

```
REACT_APP_MAPBOX_ACCESS_TOKEN= {your mapbox API key}
```

# 🦴 Project Structure

## Folder structure 🗂

<pre>  
├───.github <i>// Github actions config files </i>
├───public
└───src
    ├───api	<i>//Call to external APIs </i>
    ├───assets
    ├───components
    ├───constants
    ├───pages
    └───utils	<i>// Multipurpose code </i>

</pre>


# 🧭 App navigation



## Map view 🗺
In this view, the application shows the map with the earthquakes that match the selected range of time. The markers display a bigger radius and darker color with the earthquake magnitude. If the color is in a blue tone, it means the earthquake wasn't reviewed, if it is a red tone, it was reviewed. To change the range of time, first modify the dates and after that click on "Filter". When updating this data some time is needed.
When clicking on a marker a details panel is displayed. To display more information the user has to click on "See details" and the app shows the details view

## Detail view
In this view, the user can see most of the API's data of the specific earthquake

## Not found 🚫

Due to SEO stats, this app also has a not found page that shows up every time the user tries to enter an unexistant page.

# Wishlist and decisions made
- Search bar: The API doesn't have a proper endpoint for search, therefore it isn't very efficient to search in the frontend. 
- More filters: The main issue here is that when adding more parameters to the queries, the queries are a lot slower at the moment of the development. Event the request by ID can take more than 30 seconds to load. You can see these times at the browser devtools, filter by Fetch/XHR.


# 🕵️‍♂️ Resources
- [Deck.gl](https://deck.gl/)
- [Eslint](https://eslint.org/)
- [Formik](https://github.com/formium/formik)
- [Framer-motion](https://www.framer.com/motion/)
- [PostCSS](https://postcss.org/)
- [Prettier](https://prettier.io/)
- [React](https://es.reactjs.org/)
- [React Router](https://github.com/remix-run/react-router)
- [React-icons](https://react-icons.github.io/react-icons/)
- [React-toastify](https://github.com/fkhadra/react-toastify)
- [Tailwind](https://tailwindcss.com/)
- [Yup](https://github.com/jquense/yup)

# 🖇️ Contributing

If you want to contribute, please fork the repository, create a new branch whit your contribution, and push the branch as a pull requests.

# ✨ Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section --> <!-- prettier-ignore-start --> <!-- markdownlint-disable --> <table> <tr> <td align="center"><a href="https://github.com/mhfortuna"><img src="https://avatars.githubusercontent.com/u/66578026?v=4s=100" width="100px;" alt=""/><br /><sub><b>Mathias Fortuna</b></sub></a><br /><a href="https://github.com/rocket-team-webdev/wave/commits/develop?author=mhfortuna" title="Code">💻</a></td> </tr> </table> <!-- markdownlint-restore --> <!-- prettier-ignore-end --> <!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section --> [![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-) <!-- ALL-CONTRIBUTORS-BADGE:END -->

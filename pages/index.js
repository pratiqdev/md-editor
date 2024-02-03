//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from "react";

//* NEXT __________________________________________________________________________________________
import { useRouter } from "next/router";
import Link from "next/link";

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text, Grid, Image } from "theme-ui";

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
import { Bus } from "emotion-icons/boxicons-regular";
import { Cursor, CursorText } from "emotion-icons/bootstrap";
import { BookCheckIcon } from "lucide-react";

/*
Custom and built-in code snippets
              Automatic keyword replacement on save
              Custom and built-in templates
              VSCode style shortcuts
              Advanced settings and configuration
              100% local storage - no database required
              Automatic snippet cursor movement
              Unlimited file count with local storage
              VSCode style command palette
              Detailed, categorized and searchable documentation
              Custom format and style guides
              VSCode style editor navigation
*/

const FEATURE_CARDS = [
  {
    title: 'Command Palette',
    subtitle: '',
    text: 'VSCode style command palette with rich commands',
    image: 'screenshots/features/mde-command-palette-light.png'
  },
  {
    title: 'Code Snippets',
    text: 'Built-in, extendable and custom snippets for quick insterions',
    image: 'screenshots/features/mde-snippets.png'
  },
  {
    title:'Extensive Shortcuts',
    text:'Long list of familiar shortcuts for frequently used features',
    image: 'screenshots/features/mde-shortcuts.png'
  },
  {
    title: 'Keyword Replace',
    text: 'Automatic keyword replacement of save using the handlebars format',
    image: 'screenshots/features/mde-keyword-light.png'
  },
  {
    title: 'Advanced Settings',
    text: 'Customize appearance and behaviors of the editor and application',
    image: 'screenshots/features/mde-settings-light.png'
  },
  {
    title: '100% Local',
    text: 'No database required with 100% client-side meta/content store',
    image: 'screenshots/features/mde-local-light.png'
  },
  {
    title: 'Searchable Docs',
    text: 'Detailed docs for all features with a simple searchable doc-page',
    image: 'screenshots/features/mde-docs-light.png'
  },
  {
    title: 'Simple Navigation',
    text: 'In-code keyboard navigation using VSCode style `alt` commands',
    image: 'screenshots/features/mde-tour-light.png'
  },
  
]



const INTRO_CARDS = [
  {
    icon: Bus,
    title: 'Interactive Guide',
    text: 'Use the interactive walkthrough to get familiar with the interface and features of MDE',
    linkText: 'Take the Tour',
    linkHref: '/editor?walkthrough=true',
  },
  {
    icon: CursorText,
    title: 'Use The Editor',
    text: 'Jump in and experiment with the editor and its features or documentation',
    linkText: 'Use the Editor',
    linkHref: 'editor' ,
  },
  {
    icon: BookCheckIcon,
    title: 'Extensive Documentation',
    text: 'Use the interactive walkthrough to get familiar with the interface and features of MDE',
    linkText: 'Read the Docs',
    linkHref: 'docs', 
  }
]



/** the home page */
const Index = (props) => {

  return (
    <div className="relative  overflow-auto max-h-screen">
      <div className="bg-gradient-to-br from-gray-50 via-indigo-100 to-gray-100 dark:!from-gray-900 dark:via-indigo-800 dark:to-gray-800">

      <Navbar fixed />

      <Hero />
      <Heading />
      <Features />
      <Footer />




      </div>
    </div>
  );
};







const Hero = () => {
  return (
    <section class="text-gray-600 body-font max-w-[1200px] mx-auto">
      <div class="flex px-5 py-24 md:flex-row flex-col items-center justify-center">
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img class="object-cover object-center rounded" alt="hero" src="/mde-version-13.png" />
        </div>
        <div class=" md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-200">Markdown Editor
          </h1>
          <p class="mb-8 leading-relaxed text-xl max-w-[60ch] dark:text-gray-400">VSCode style markdown editor and live renderer. Advanced features like code snippets and find-replace on save, all stored locally.</p>
          <div class="flex justify-center">
            <a href="/editor" class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</a>
            <a href="/editor?walkthrough=true" class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Take a Tour</a>
          </div>
        </div>
      </div>
    </section>
  )
}







const Heading = () => {
  return (
    <section class="text-gray-600 body-font max-w-[1200px] mx-auto">
      <div class="container px-5 py-24 pt-0 mx-auto flex flex-wrap">
        <div class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <img alt="feature" class="object-cover object-center h-full w-full" src="screenshots/editor1.png" />
        </div>
        <div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center justify-center">
          
          {INTRO_CARDS.map(item =>
          <div class="flex flex-col md:flex-row  mb-10 lg:items-start items-center">
            <div class="w-24 h-24 min-w-24 max-w-24 min-h-24 max-h-24 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 p-5 mr-6">
              {item.icon && <item.icon />}
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-2xl title-font font-medium mb-3 dark:text-gray-200">{item.title}</h2>
              <p class="leading-relaxed text-xl max-w-[60ch] dark:text-gray-400">{item.text}</p>
              <a class="mt-3 text-xl text-indigo-500 inline-flex items-center" href={item.linkHref}>{item.linkText}
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        )}

        </div>


      </div>
    </section>
  )
}


const Features = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="text-3xl font-medium title-font mb-4 text-gray-900 dark:text-gray-200">Feature Rich Experience</h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-xl max-w-[60ch] dark:text-gray-400">Explore the advanced features and options of MDE editor, documentation and renderer</p>
        </div>
        <div class="flex flex-wrap -m-4 max-w-[1200px] mx-auto">
         
        {FEATURE_CARDS.map(item =>
          <div class="p-8 lg:w-1/2 md:w-1/2">
            <div class="h-full flex flex-col items-center text-center">
              <img alt="team" class="flex-shrink-0 rounded-lg w-full h-72 object-cover object-center mb-4" src={item.image} />
                <div class="w-full">
                  <h2 class="title-font font-medium text-lg text-gray-900 dark:text-gray-200">{item.title}</h2>
                  <h3 class="text-gray-500 mb-3 dark:text-gray-400">{item.subtitle}</h3>
                  <p class="mb-4 dark:text-gray-400">{item.text}</p>
                </div>
            </div>
          </div>
          )}

         
        </div>
      </div>
    </section>
  )
}


const Footer = () => {
  return (
    <footer class="text-gray-600 body-font bg-gray-100 dark:bg-gray-900">
      <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src="mde-version-13.png" className="w-10"/>
            <span class="ml-3 text-xl  dark:text-gray-200">MarkDown Editor</span>
          </a>
          <p class="mt-2 text-sm text-gray-500">Advanced in-browser markdown editor and renderer</p>
        </div>
        <div class="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          
          {/* <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav class="list-none mb-10">
              <li>
                <a class="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div> */}

          <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 dark:text-gray-200">GETTING STARTED</h2>
            <nav class="list-none mb-10 flex flex-col gap-2">
              <li>
                <a href="/editor?walkthrough=true" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Take a Tour</a>
              </li>
              <li>
                <a href="/docs" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Read the Docs</a>
              </li>
              <li>
                <a href="/editor" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Example File</a>
              </li>
             
            </nav>
          </div>

          <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 dark:text-gray-200">DOCUMENTATION</h2>
            <nav class="list-none mb-10 flex flex-col gap-2">
              <li>
                <a href="/docs?search=command-palette" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Command Palette</a>
              </li>
              <li>
                <a href="/docs?search=templates" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Custom Templates</a>
              </li>
              <li>
                <a href="/docs?search=snippet" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Code Snippets</a>
              </li>
              <li>
                <a href="/docs?search=files" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">File Management</a>
              </li>
          
            </nav>
          </div>

          <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 dark:text-gray-200">DOCUMENTATION</h2>
            <nav class="list-none mb-10 flex flex-col gap-2">
              <li>
                <a href="/docs?search=drag" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Drag and Drop</a>
              </li>
              <li>
                <a href="/docs?search=wrap" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Wrap Lines</a>
              </li>
              <li>
                <a href="/docs?search=fold" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Code Folding</a>
              </li>
              <li>
                <a href="/docs?search=font" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">Font Settings</a>
              </li>

            </nav>
          </div>

        </div>
      </div>
      <div class="bg-gray-100 dark:bg-black">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p class="text-gray-500 text-sm text-center sm:text-left">2024 Michael Jannetta —
            <a href="https://twitter.com/pratiqdev" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@pratiqdev</a>
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
           
            <a href="https://twitter.com/pratiqdev" class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href="https://instagram.com/pratiqdev" class="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/michael-jannetta" class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}


export default Index;
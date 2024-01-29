# VuePredictiveSearch
VuePredictiveSearch is a Vue.js component that provides a simple yet powerful predictive search feature for your web applications. It supports fuzzy search, making it easy for users to find relevant items even with slight typos or variations.

## Installation
```bash
npm install VuePredictiveSearch
```

## Using VuePredictiveSearch in Your Project

To integrate `VuePredictiveSearch` into your Vue.js project, you can follow the example code below:

```vue
<script lang="ts" setup>
import { VuePredictiveSearch } from 'VuePredictiveSearch'
import { ref } from "vue"

const books = ref([
  // Your array of books goes here
]);

const viewUserSelection = (data: Object) => {
  console.log(data)
}
</setup>
<template>
  
  <VuePredictiveSearch @selected="viewUserSelection" inputClasses="searchInput" :source="books" label="name" :fieldsToSearchFrom="['title', 'author', 'genre']" :fieldsToReturnOnMatch="['title', 'author', 'genre', 'price', 'publicationYear','id']">
    <template #no-element-found>
      <p>No element found</p>
    </template>
    <template #item="{ title, author }">
      <div class="item">
        <p>{{ title }}, {{ author }}</p>
      </div>
    </template>
  </VuePredictiveSearch>
</template>
```
## Props

- __source__: Array of items to search from (this component is designed for a flat database structure without nested elements).
- __label__: Key used as a label for each item.
- __fieldsToSearchFrom__: Array of field names to search from.
- __fieldsToReturnOnMatch__: Array of field names to return when a match is found.
- __inputClasses (Optional)__: Custom classes for the search input.

📌 The component is using slots to allow a high customization, you will bring your own UI, just make sure to attach everything to the proper named slot

## Events
__selected__: Emits the selected item when a user makes a selection.

## Features
- Fuzzy Search: VuePredictiveSearch uses fuzzy search with a matching threshold, allowing users to find items even with typos or variations in the search query.
- Customizable: Easily customize the component with your own templates for no-element-found and each item in the search result list.

## How it Works
The component utilizes the [MiniSearch](https://www.npmjs.com/package/minisearch) library for efficient searching. It performs a fuzzy search with a configurable threshold, ensuring a smooth and user-friendly search experience.

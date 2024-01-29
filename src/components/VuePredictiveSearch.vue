<template>
  <div>
    <input :class="inputClasses" @input="updateSuggestionList" type="search" v-model="search" placeholder="what are you looking for?" />
    <div v-if="!items.length && !hasNeverSearch">
      <slot name="no-element-found"></slot>
    </div>
    <ul>
      <li v-for="item in items" @click="selectElement(item, item[label])">
        <slot name="item" v-bind="item" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import MiniSearch from "minisearch"
import ShortUniqueId from "short-unique-id"

const emit = defineEmits(['selected'])
const props = defineProps({
  source: { type: Array, required: true },
  label: { type: String, required: true },
  fieldsToSearchFrom: { type: Array, required: true },
  fieldsToReturnOnMatch: { type: Array, required: true },
  inputClasses: String
})
var searchEngine;
const items = ref([])
const hasNeverSearch = ref(true)
const uid = new ShortUniqueId({ length: 10 });
const datasource = props.source.map(item => {
  const newEl = item;
  if ('id' in newEl) newEl._id = newEl.id;
  newEl.id = uid.rnd()
  return newEl;
})

const search = ref("")
const selectElement = (item, inputlabel) => {
  search.value = inputlabel
  emit('selected', item)
}
onMounted(() => {
  searchEngine = new MiniSearch({
    fields: props.fieldsToSearchFrom.map(element => (element === 'id' ? '_id' : element)),
    storeFields: props.fieldsToReturnOnMatch.map(element => (element === 'id' ? '_id' : element)),
  })
  searchEngine.addAll(datasource)
})
let timeoutId;
const updateSuggestionList = (event) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const result = searchEngine.search(event.target.value, { prefix: true, fuzzy: 0.2 });
    items.value = result.map(obj => {
      const newObj = {};
      props.fieldsToReturnOnMatch.forEach(prop => {
        newObj[prop] = obj[prop]
      });
      if (newObj.hasOwnProperty('_id')) {
        newObj.id = newObj._id;
        delete newObj._id;
      }
      return newObj;
    });
    if (hasNeverSearch.value) hasNeverSearch.value = false;
  }, 300)
}
</script>
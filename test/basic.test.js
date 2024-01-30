// VuePredictiveSearch.spec.js
import { mount } from '@vue/test-utils';
import VuePredictiveSearch from '../src/components/VuePredictiveSearch.vue'

describe('VuePredictiveSearch', () => {
    it('renders the component correctly', () => {
        const wrapper = mount(VuePredictiveSearch, {
            props: {
                inputClasses: "searchInput",
                source: [{
                        title: 'The Mystery of the Enchanted Library',
                        author: 'Amanda Reader',
                        genre: 'Mystery',
                        price: 15.99,
                        publicationYear: 2022,
                    },
                    {
                        title: 'Coding Adventures in JavaScript',
                        author: 'Dev Coder',
                        genre: 'Programming',
                        price: 29.99,
                        publicationYear: 2021,
                    },
                ],
                label: "name",
                fieldsToSearchFrom: ['title', 'author', 'genre'],
                fieldsToReturnOnMatch: ['title', 'author', 'genre', 'price', 'publicationYear', 'id']
            },
            slots: {
                'no-element-found': '<p class="not-found">No custom element found</p>',
                item: '<div class="custom-item"><p>{{title}}</p></div>',
            },
        });

        expect(wrapper.find('input').exists()).toBe(true);
        expect(wrapper.find('ul').exists()).toBe(true);
    });

    it('doesnt show the empty message at start', () => {
        const wrapper = mount(VuePredictiveSearch, {
            props: {
                inputClasses: "searchInput",
                source: [],
                label: "name",
                fieldsToSearchFrom: ['title', 'author', 'genre'],
                fieldsToReturnOnMatch: ['title', 'author', 'genre', 'price', 'publicationYear', 'id']
            },
            slots: {
                'no-element-found': '<p class="not-found">No custom element found</p>',
                item: '<div class="custom-item"><p>{{item.title}}</p></div>',
            },
        });

        expect(wrapper.find('.not-found').exists()).toBe(false)
    });

    // more test to come...
});
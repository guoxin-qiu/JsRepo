import { Vue } from 'vue/types/vue';

new Vue({
    el: '#app',
    components: {

    },
    data() {
        return {
            message: 'Hello Vuejs',
            newTodo: '',
            todos: [
                { text: 'Learn JavaScript' },
                { text: 'Learn Vue.js' },
                { text: 'Build Something Awesome' }
            ],
            checkedNames: []
        }
    },
    methods: {
        reverseMessage() {
            this.message = this.message.split('').reverse().join('');
        },
        addTodo() {
            var text = this.newTodo.trim();
            this.todos.push({ text: text });
            this.newTodo = '';
        },
        removeTodo(index: number) {
            this.todos.splice(index, 1);
        }
    }
})
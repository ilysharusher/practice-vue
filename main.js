new Vue({
    el: '#app',
    data: {
        quotes: [
            {
                "quote": "This is just a Quote1",
                "source": "Christopher"
            },
            {
                "quote": "This is just a Quote2",
                "source": "Martin"
            },
            {
                "quote": "This is just a quote3",
                "source": "Dennis"
            },
            {
                "quote": "This is just a quote4",
                "source": ""
            },
        ],
        showQuotesWithAuthor: true,
    },
    computed: {
        sortedQuotes() {
            return this.quotes.slice().sort((a, b) => {
                const authorA = a.source.toLowerCase().split(' ').pop();
                const authorB = b.source.toLowerCase().split(' ').pop();
                return authorA.localeCompare(authorB);
            });
        },
    },
    methods: {
        sortQuotesByLastName() {

        },
    },
});

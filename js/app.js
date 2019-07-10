const app = new Vue({
    el: '#csApp',
    data: {
        riders: [],
        original_riders: [],
        searchTerm: ''
    },
    mounted: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            fetch('https://api.airtable.com/v0/appAX9DE014Dn1oEU/Riders', {
                    headers: {
                        'Authorization': 'Bearer keyHllUlxSkwzWL20'
                    }
                }).then(res => res.json())
                .then(data => {
                    this.riders = data.records;
                    this.original_riders = data.records;
                }).catch(error => console.log(error));
        },
        filterList: function () {
            this.riders = this.original_riders.filter(s => {
                if (s.fields.Rider.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
                    return true;
                if (s.fields.Motorcycle.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
                    return true;
                if (s.fields.Number.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
                    return true;
                return false;
            });
        },
        clearSearch: function () {
            this.searchTerm = '';
            this.filterList();
        }
    }
});
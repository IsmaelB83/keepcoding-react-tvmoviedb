export default class Movie {
    adult;
    backdrop_path;
    genre_ids;
    id;
    original_language;
    original_title;
    overview;
    popularity;
    poster_path;
    release_date;
    title;
    video;
    vote_average;
    vote_count;
    
    constructor(value) {
        this.adult = value.adult;
        this.backdrop_path = value.backdrop_path;
        this.genre_ids = value.genre_ids;
        this.id = value.id;
        this.original_language = value.original_language;
        this.original_title = value.original_title;
        this.overview = value.overview;
        this.popularity = value.popularity;
        this.poster_path = value.poster_path;
        this.release_date = value.release_date;
        this.title = value.title;
        this.video = value.video;
        this.vote_average = value.vote_average;
        this.vote_count = value.vote_count;
    }
    
    isImportant() {
        return this.vote_count > 25;
    }
}
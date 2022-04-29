# Enterprise Web Dev - Assignment 1.

__Name:__ [Ritto Thimothy]

### Overrview.

[A bullet-point list of the features developed for the React SPA app (new/modified ones only for the Movies app),]

+ Upcoming Movies
+ Now Playing Movies
+ Top Rated Movies
+ Latest People
+ Popular People
+ People details
+ People Movie Credits
+ Movie Search Form
+ Add Fantasy Movie
+ Fantasy Movie Listing
+ Fantasy Movie Details
+ Login & Sign Up
+ Pagination

## Feature Design.

__Upcoming Movies.__
__The Upcoming Movies feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/upcoming_movies.png)

> Lists of upcoming movies from tmdb end point

__URL:__ /movies/upcoming

__Now Playing Movies.__
__Now Playing Movies feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/nowplaying_movies.png)

> Lists of now playing movies from tmdb end point

__URL:__ /movies/nowplaying

__Top Rated Movies.__
__Top rated Movies feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/toprated_movies.png)

> Lists of top rated movies from tmdb end point

__URL:__ /movies/toprated

__Popular People.__
__The Popular People feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/latest_people.png)

> Retreives latest person added from tmdb end point

__URL:__ /people/latest

__Popular People.__
__The Popular People feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/popular_people.png)

> Lists of people from the popular people endpoint of TMDB

__URL:__ /people/popular

__People Details.__
__People Details feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/people_details.png)

> fetch individual people details including image and texts.

__URL:__ /people/:id

__People Movie Credits.__
__People Movie Credits feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/people_movie_credits.png)

> fetch movie credits with movie image of individual people in people details screen.

__URL:__ /people/:id

__Movie Search Form.__
__Movie Search Form feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/movie_search_form.png)
![image](https://github.com/rittos/moviesApp/blob/develop/images/movie_search_modal.png)

> Lists all movies based on filter criteria selected from form inputs, includes option to select actors from modal popup.

__URL:__ /movies/searchmovie


__Add Fantasy Movie.__
__Add Fantasy Movie feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/add_fantasy_movie_image1.png)
![image](https://github.com/rittos/moviesApp/blob/develop/images/add_fantasy_movie_image2.png)

> Provides option to create a fantasy movie, includes cast selection from popup modal.

__URL:__ /fantasymovie

__Fantasy Movie Listing.__
__Fantasy Movie Listing feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/fantasy_movie.png)

> Display logged in user created fantasy movie with hyperlink to details.

__URL:__ /fantasymovie

__Fantasy Movie Details.__
__Fantasy Movie Details feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/fantasy_movie_details.png)

> fetch fantasy movie details including casts images in card 

__URL:__ /fantasymoviedetails/:id

__Login & Sign Up.__
__Login & Sign Up feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/login.png)
![image](https://github.com/rittos/moviesApp/blob/develop/images/signup.png)

> allows user to login to website and register a new account if needed.And also restricts features favorite only for authenticated users. Includes publicand private page implementation as well.

__URL:__ /login
__URL:__ /signup

__Sorting & Filtering.__
__Sorting & Filtering feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/filter_and_sort.png)

> User can filter movies based on Language & Genre, include sorting based on movie title

__URL:__ /

__Pagination.__
__Pagination feature.__

![image](https://github.com/rittos/moviesApp/blob/develop/images/movies_pagination.png)
![image](https://github.com/rittos/moviesApp/blob/develop/images/peoples_pagination.png)

> Pagination added across multiple screen including movie listing, people listing and movie search form page.

__URL:__ /


## Storybook.
![image](https://github.com/rittos/moviesApp/blob/develop/images/story_overview.png)
![image](https://github.com/rittos/moviesApp/blob/develop/images/story_peoplecard.png)
![image](https://github.com/rittos/moviesApp/blob/develop/images/story_peoplecard_exception.png)

![image](https://github.com/rittos/moviesApp/blob/develop/images/story_peopledetails.png)
![image](https://github.com/rittos/moviesApp/blob/develop/images/story_peopleheader.png)

### Server state caching.

[Show a screenshot(s) from the react-query Dev tools that illustrate all the entity types cached by your app (Use appropriate magnification for accessibility). State the type of data relating to each cache entry.]

e.g.

![][image4]

+ [discover] - List of movies from the Discovery endpoint.
+ [movie,[id,:id]] - All properties for a particular movie.
+ etc

## Authentication.

[Briefly explain the method used for supporting authentication and include any relevant screenshots (e.g. Dev tools Network tab for session keys). State which parts of the app's functionality require authentication, e.g. the Favourites feature.]

## Algorithm (if relevant).

[State the purpose of the algorithm you chose to implement and explain, in general, the computation model used.]

## Additional Information.

[Highlight any other aspects of your app's design or implementation that is non-standard and worthy of mention.]

[image1]: ./images/image1.png
[image2]: ./images/image2.png
[image3]: ./images/image3.png
[image4]: ./images/image4.png
[image5]: ./images/image5.png
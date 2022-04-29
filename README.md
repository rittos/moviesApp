# Enterprise Web Dev - Assignment 1.

__Name:__ [Ritto Thimothy]

### Overrview.

[A bullet-point list of the features developed for the React SPA app (new/modified ones only for the Movies app),]

+ Popular People
+ People details
+ People Movie Credits
+ Movie Search Form
+ Add Fantasy Movie
+ Fantasy Movie Listing
+ Fantasy Movie Details
+ Login & Sign Up

## Feature Design.

[For each feature listed in the overview, show a screenshot(s) of its UI layout (use appropriate magnification for accessibility). Include a caption and specify its URL path.]

__Popular People.__
__The Popular People feature.__


![][popular_people]

> Lists of people from the popular people endpoint of TMDB

__URL:__ /people/popular

__People Details.__
__People Details feature.__

![][people_details]

> fetch individual people details including image and texts.

__URL:__ /people/:id

__People Movie Credits.__
__People Movie Credits feature.__

![][people_movie_credits]

> fetch movie credits with movie image of individual people in people details screen.

__URL:__ /people/:id

__Movie Search Form.__
__Movie Search Form feature.__

![][movie_search_form]
![][movie_search_modal]

> Lists all movies based on filter criteria selected from form inputs, includes option to select actors from modal popup.

__URL:__ /movies/searchmovie


__Add Fantasy Movie.__
__Add Fantasy Movie feature.__

![][add_fantasy_movie_image1.png]
![][add_fantasy_movie_image2.png]

> Provides option to create a fantasy movie, includes cast selection from popup modal.

__URL:__ /fantasymovie

__Fantasy Movie Listing.__
__Fantasy Movie Listing feature.__

![][fantasy_movie]

> Display logged in user created fantasy movie with hyperlink to details.

__URL:__ /fantasymovie

__Fantasy Movie Details.__
__Fantasy Movie Details feature.__

![][fantasy_movie_details]

> fetch fantasy movie details including casts images in card 

__URL:__ /fantasymoviedetails/:id

__Login & Sign Up.__
__Login & Sign Up feature.__

![][login]
![][signup]

> allows user to login to website and register a new account if needed.And also restricts features favorite only for authenticated users. Includes publicand private page implementation as well.

__URL:__ /login
__URL:__ /signup

__Sorting & Filtering.__
__Sorting & Filtering feature.__

![][filter_and_sort]

> User can filter movies based on Language & Genre and include sorting based on movie title

__URL:__ /


## Storybook.

[Include a screenshot(s) from the Storybook UI and highlight the stories for new components developed.]

e.g.

![][image5]


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
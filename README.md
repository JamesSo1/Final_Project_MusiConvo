# Web Development Final Project - *MusiConvo*

Submitted by: **James So**

This web app: **allows music enthusiasts to discuss music with each other by allowing them to make posts, like and dislike posts, and comment on each other's posts. Posts can be deleted and edited by the creator of the post as long as the creator remembers the post password assigned to their post.**

Time spent: **7** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A create form that allows the user to create posts**
- [x] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [x] **A home feed displaying previously created posts**
- [x] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [x] **Clicking on a post shall direct the user to a new page for the selected post**
- [x] **Users can sort posts by either their created time or upvotes count**
- [x] **Users can search for posts by title**
- [x] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [x] **Users can leave comments underneath a post on the post's separate page**
- [x] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [x] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [x] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [x] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [x] A dislike button was added and was made so that the user could not like and dislike a post at the same time
* [x] To upload a YouTube video to their post, all a user has to do is provide the YouTube URL(i.e. https://www.youtube.com/watch?v=jsjansjd) as the post's video URL

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<a href="https://www.loom.com/share/4311e592c08d411ea77b8b4a2790af75">
<img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/4311e592c08d411ea77b8b4a2790af75-with-play.gif">
</a>



<!-- Replace this with whatever GIF tool you used! -->
GIF created with Loom  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

The main challenge with building this app was being able to plan out all of the pages and components I wanted to include since there was a lot of them. To overcome this challenge, I made sure to spend a good amount of time planning and drawing out a layout for this web app before actually coding it out. I also planned out what content my Supabase database would need to hold based on my web app design plan. 

## License

    Copyright 2024 James So

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

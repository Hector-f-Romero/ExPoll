# ExPoll

Create real time polls in few steps supported for pc, mobile and another devices with internet connection

# Overview

-   🧠 [Getting Started](#getting-started)
-   ⚙ [Build with](#built-with)
-   🎯 [Main challenges](#main-challenges)
-   📚 [Documentation](#documentation)

# Getting Started

Before installing, download and install [Node.js](https://nodejs.org/en) and create a cluster in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core-high-int_prosp-brand_gic-null_amers-co_ps-all_desktop_eng_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=19628288151&adgroup=146573411678&cq_cmp=19628288151&gad=1&gclid=Cj0KCQjwqs6lBhCxARIsAG8YcDiZE8HP8YLgV32NNmGH5ifoqTi3VrtGoGRE4bP7LqSA1khbLyZH5zcaAho5EALw_wcB).

This project required use and install the files in `backend` and `frontend` branch:

1. Clone the repository twice using `git clone https://github.com/Hector-f-Romero/ExPoll.git` from any terminal.
2. Go into one of us with `cd Expoll`.
3. Remove current origin repository with `git remote remove origin`.
4. Change to branch `backend` and set the enviroment variables considering the file `.example.env`.
5. Run `npm install`.
6. In the another clone, repeat the step 3 and change to branch `frontend`
7. Set the enviroment variables considering the file `.example.env`.
8. Run `npm install`.
9. Test the application and enjoy.

# Built with

This project was built using these technologies:

### Frontend

-   Vite
-   React
-   Tailwind CSS

### Backend

-   NodeJS
-   TypeScript
-   Express
-   MongoDB
-   Socket.IO

---

# Main Challenges

## How implement the real-time timer of the poll?

Initially, I had thought to use in real time poll timer web sockets and use setInterval in the client side. However, this can lead in synchronization and security failures. Subsequently, I read about **Server Side Events (SSE)** and I implemented them for allowing communication in one way from the server to the client, avoiding giving this responsibility to the client.

## Implement charts in React

Being my first time using these types of resources, I discovered that there are several libraries that offer to create these graphics with high customization and ease of use. Chart.js was implemented due to its extensive documentation and integration with React via react-chartjs-2.

## Responsive design

My approach to working on backend always creates a challenge to create user interfaces that suit most devices that users can employ. Using Tailwind CSS and its syntax, it was possible to achieve a decent result on both mobile devices and computers using [ResponsivelyApp](https://responsively.app) as a guide

## Authentication and authorization

To add a security layer to the REST API, the use of JWT was implemented to verify that the user has authenticated through a token that is sent in the HTTP request of many endpoints, in addition to having a validation that will take the role of the user and verify that the path is accessible to him or not as specified roles allowed.

However, keeping authentication and authorization information on the client side was a difficult challenge when thinking about different techniques such as cookies, sessions and storage in localStorage. To avoid further delay in this decision, it was decided to save the authentication token in localStorage despite not recommending this in many internet forums and manage user information in a React context, as implementing Redux in this case was convenient because of the simple application.

## Organize the README

For this first documented project, I have been looking many repositories to question what sections are important to put in this file and which not.

# Preview

![Preview of voting system](https://drive.google.com/file/d/1VmKuEyACnMjtAGPlLzMZNPLQuI2WuJb0/view?usp=sharing)

# Documentation

To expand knowledges about the process of planning and requirements of the application, check the next links:

[Documentation of this application in english.](https://drive.google.com/file/d/1DV1b_pHXcVVisL9MozRuppsDdLn-7IvU/view?usp=sharing)

[Documentation of this application in spanish.](https://drive.google.com/file/d/1_jtwkCKUuMxlhAb6IfJ1Qzp9u6fpD7pf/view?usp=sharing)

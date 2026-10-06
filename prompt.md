# Antigravity Gemini 3.1 Pro (High) --- Next News Project Prompt

You are acting as a senior professional full-stack engineer and software
architect.

Build the project **Next News** strictly according to the project
description, technology stack, architecture requirements, UI
requirements, and development rules below.

------------------------------------------------------------------------

## 1. PROJECT NAME

**Next News**

------------------------------------------------------------------------

## 2. MANDATORY TECHNOLOGY STACK

Use **only** the following technologies for this project:

-   Node.js
-   React.js
-   TypeScript
-   Express.js
-   MongoDB
-   Tailwind CSS
-   JWT

### Strict Stack Rule

**Do not add, replace, or introduce any other technology, framework,
database, backend language, frontend framework, CSS framework,
authentication system, or major library outside the stack specified
above.**

Do not migrate the project to another stack.

Do not use Next.js.

Do not use Firebase.

Do not use Supabase.

Do not use PostgreSQL.

Do not use MySQL.

Do not use Python.

Do not use Java/Spring Boot.

Do not use Django.

Do not use any alternative authentication provider.

Do not add technologies simply because they are convenient.

If something is not explicitly required by this prompt, do not introduce
it as a new project technology.

------------------------------------------------------------------------

# 3. PROJECT DESCRIPTION --- FOLLOW STRICTLY

The project is a **full-stack MERN news platform with real-time APIs and
JWT authentication**.

The implementation must strictly cover the following requirements:

### Core Requirement

-   Develop a full-stack MERN news platform.
-   Use real-time APIs.
-   Implement JWT authentication.

### Performance Requirement

-   Engineer a full-stack, responsive news application using React.js
    and MongoDB.
-   Optimize the application to target a **35% reduction in page-load
    times**.
-   Use optimized server-side rendering and client-side routing as part
    of the performance architecture.

### Backend / API Requirement

-   Architect scalable RESTful API routes.
-   Use Mongoose schemas.
-   Build an interactive commenting system.
-   Build a watchlist system.
-   Manage relational data between Users and Articles.
-   Structure the system to target an estimated **40% improvement in
    user engagement metrics**.

### Authentication Requirement

-   Implement secure JWT-based authentication.
-   Include client-side profile management.
-   Include image uploads using Axios.
-   Focus on authentication security and reliability.

### Scope Rule

These requirements are the boundaries of the project.

**Do not invent additional product features, modules, business
requirements, or technologies that are not supported by the description
above.**

------------------------------------------------------------------------

# 4. DEVELOPMENT OBJECTIVE

Build the application as a **professional production-level project**,
following the engineering practices that experienced software engineers
would use.

The codebase must be:

-   Clean
-   Maintainable
-   Modular
-   Scalable
-   Secure
-   Consistent
-   Production-oriented
-   Properly typed
-   Properly structured
-   Easy to understand
-   Easy to extend within the defined project scope

Do not create a quick prototype.

Do not create a tutorial-style project.

Do not place everything in a few large files.

Do not create unnecessary abstractions.

Do not over-engineer features outside the project requirements.

------------------------------------------------------------------------

# 5. PRODUCTION-LEVEL ARCHITECTURE

Use a professional full-stack architecture with a clear separation
between:

-   Frontend
-   Backend
-   API routes
-   Controllers
-   Business/service logic where genuinely required
-   Database models/schemas
-   Authentication
-   Middleware
-   Configuration
-   Shared TypeScript types where appropriate
-   Reusable UI components

Maintain clear boundaries between responsibilities.

### Backend principles

The Express.js backend should have a professional structure for:

-   Application/server setup
-   Routes
-   Controllers
-   Authentication middleware
-   Validation/error handling where necessary
-   Mongoose models
-   Database configuration
-   API-related logic
-   Configuration/environment handling

### Frontend principles

The React.js frontend should have a professional structure for:

-   Pages
-   Reusable components
-   Layouts
-   Routing
-   API communication
-   Authentication state/flow
-   Profile management
-   News/article UI
-   Comments
-   Watchlist
-   Responsive UI
-   Loading/error/empty states

Use TypeScript consistently throughout the project.

------------------------------------------------------------------------

# 6. PRODUCTION-LEVEL FOLDER STRUCTURE

Create a clean, professional folder structure.

Use a structure along these lines and adapt it only when genuinely
necessary:

``` text
next-news/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

This is a structural guideline, not permission to add unrelated modules.

Only create folders/files that have a genuine purpose in implementing
the specified project.

------------------------------------------------------------------------

# 7. UI / UX REQUIREMENTS

The UI is extremely important.

Create a **beautiful, modern, unique, professional, production-quality
news platform UI**.

The interface must be:

-   Highly attractive
-   Clean
-   Modern
-   Responsive
-   Professional
-   Visually consistent
-   Easy to navigate
-   Desktop responsive
-   Tablet responsive
-   Mobile responsive
-   Suitable for a real-world news platform

Use Tailwind CSS consistently.

### UI expectations

The application should have a strong visual hierarchy for:

-   News/articles
-   Article details
-   User profile
-   Authentication screens
-   Comments
-   Watchlist
-   Navigation
-   Loading states
-   Error states
-   Empty states

Avoid generic-looking template UI.

Avoid excessive visual effects.

Avoid unnecessary animations.

Keep the design polished and purposeful.

The UI should look like a professionally designed product rather than a
student demo.

------------------------------------------------------------------------

# 8. RESPONSIVE DESIGN

The entire application must work properly across:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

Do not make desktop-only layouts.

Do not rely on fixed widths that break on smaller screens.

Use responsive Tailwind CSS layouts.

Check:

-   Navigation
-   Article cards
-   Article details
-   Comments
-   Profile
-   Authentication pages
-   Watchlist
-   Forms
-   Image layouts

for responsive behavior.

------------------------------------------------------------------------

# 9. AUTHENTICATION

Implement the required **JWT-based authentication system** securely.

The authentication flow must support:

-   User registration
-   User login
-   JWT authentication
-   Protected application functionality
-   Client-side authentication handling
-   Profile management
-   Secure authenticated API requests
-   Logout

Do not replace JWT with another authentication provider.

Keep authentication logic modular and production-oriented.

Do not expose secrets in source code.

Use environment configuration appropriately.

------------------------------------------------------------------------

# 10. USER PROFILE AND IMAGE UPLOAD

Implement client-side profile management as specified.

The profile functionality must support the required user information and
profile image handling.

Use **Axios** for image upload/API communication as specified.

Keep image handling clean and secure.

Do not add unrelated profile/social features.

------------------------------------------------------------------------

# 11. NEWS / ARTICLE FUNCTIONALITY

The application must provide the news/article experience described by
the project.

Structure article-related data professionally using MongoDB/Mongoose.

The frontend should provide a polished experience for consuming
articles.

Use reusable article/news components rather than duplicating UI.

------------------------------------------------------------------------

# 12. COMMENTS

Implement an interactive commenting system.

The system should support the required relationship between:

-   Users
-   Articles
-   Comments

Use appropriate Mongoose schemas and references.

Keep the API structure RESTful.

Keep the frontend interaction clean and responsive.

Do not add unrelated social-media functionality.

------------------------------------------------------------------------

# 13. WATCHLIST

Implement the watchlist system described in the project.

The watchlist must be associated with authenticated users and articles.

Use appropriate database relationships.

Keep the implementation modular.

The frontend should provide a clear way for users to interact with their
watchlist.

Do not add unrelated bookmarking/recommendation systems beyond the
required watchlist functionality.

------------------------------------------------------------------------

# 14. DATABASE DESIGN

Use **MongoDB with Mongoose**.

Design schemas professionally for the required entities.

At minimum, model the relationships required for:

-   Users
-   Articles
-   Comments
-   Watchlist

Use appropriate references and indexes where justified.

Avoid unnecessary database entities.

Avoid duplicated data when it is not needed.

Keep database logic maintainable.

------------------------------------------------------------------------

# 15. REST API DESIGN

Create scalable RESTful API routes.

Use consistent:

-   HTTP methods
-   Route naming
-   Request handling
-   Response structures
-   Error handling
-   Authentication middleware

Keep controllers focused.

Do not place the entire backend implementation inside route files.

Do not create giant controller files.

------------------------------------------------------------------------

# 16. REAL-TIME API REQUIREMENT

The project description explicitly requires **real-time APIs**.

Implement the real-time behavior required by the project without
changing the specified technology stack.

Keep the implementation focused on the actual news-platform
requirements.

Do not introduce an unrelated real-time product or feature.

------------------------------------------------------------------------

# 17. PERFORMANCE REQUIREMENT

The project description specifies a target of a **35% reduction in
page-load times**.

Treat performance as a core engineering requirement.

Use appropriate optimization within the given stack, including:

-   Efficient React rendering
-   Proper client-side routing
-   Avoiding unnecessary renders
-   Efficient API requests
-   Efficient MongoDB queries
-   Appropriate database indexes
-   Optimized data fetching
-   Efficient component structure
-   Image optimization where applicable
-   Avoiding unnecessary JavaScript work
-   Sensible code organization

The architecture should support the claimed performance improvement.

Do not falsely claim measured performance if it has not actually been
benchmarked.

If a metric has not been measured, clearly distinguish between a target
and an observed result.

------------------------------------------------------------------------

# 18. CODE QUALITY

Follow professional engineering standards.

### TypeScript

Use strong typing.

Avoid unnecessary `any`.

Define interfaces/types for important data structures.

Keep API contracts consistent between frontend and backend.

### React

Use reusable components.

Avoid unnecessarily large components.

Keep business logic out of purely presentational components where
appropriate.

### Express

Keep routing, controllers, middleware, models, and services properly
separated.

### MongoDB

Use sensible schema design.

Use indexes where justified.

Avoid inefficient queries.

### Security

Protect authenticated routes.

Validate important input.

Do not hard-code secrets.

Do not expose sensitive configuration.

------------------------------------------------------------------------

# 19. ERROR / LOADING / EMPTY STATES

Implement professional user-facing states where needed:

-   Loading states
-   API error states
-   Authentication errors
-   Empty watchlist state
-   Empty comments state
-   Invalid article state
-   Profile loading/error states

Do not leave users staring at blank screens.

Keep error messages clear and user-friendly.

------------------------------------------------------------------------

# 20. DEVELOPMENT MUST HAPPEN IN PHASES

Do **not** attempt to build the entire project randomly in one pass.

Develop the project in clear professional engineering phases.

Follow this sequence.

------------------------------------------------------------------------

## PHASE 0 --- REQUIREMENTS AND ARCHITECTURE

Before writing substantial code:

1.  Read this entire prompt.
2.  Extract the exact project requirements.
3.  Confirm the mandatory technology stack.
4.  Define the production-level architecture.
5.  Define the folder structure.
6.  Define the core data models.
7.  Define the API boundaries.
8.  Define the frontend route/page structure.
9.  Define the authentication flow.
10. Define the performance strategy.
11. Define the UI design direction.

Do not start adding unrelated features.

At the end of this phase, verify that the architecture stays within the
project description.

------------------------------------------------------------------------

## PHASE 1 --- PROJECT FOUNDATION

Set up:

-   Root project structure
-   React frontend
-   TypeScript configuration
-   Express backend
-   TypeScript backend
-   MongoDB/Mongoose configuration
-   Tailwind CSS
-   Environment configuration
-   Basic application/server structure

Ensure the project starts correctly.

Do not build unrelated functionality yet.

------------------------------------------------------------------------

## PHASE 2 --- DATABASE AND BACKEND FOUNDATION

Implement:

-   Mongoose models
-   User model
-   Article model
-   Comment model
-   Watchlist relationship/model
-   Database connection
-   REST API foundation
-   Error handling foundation
-   Authentication middleware foundation

Keep the backend modular and production-oriented.

------------------------------------------------------------------------

## PHASE 3 --- JWT AUTHENTICATION

Implement:

-   Registration
-   Login
-   JWT generation
-   JWT verification
-   Protected routes
-   Logout
-   Authenticated API requests
-   Client-side authentication handling

Test authentication before moving forward.

------------------------------------------------------------------------

## PHASE 4 --- NEWS / ARTICLE PLATFORM

Implement the core news/article experience.

Build:

-   Article API
-   Article retrieval
-   Article UI
-   Article detail experience
-   Responsive article cards
-   Article-related routing
-   Proper loading/error states

Keep the design polished.

------------------------------------------------------------------------

## PHASE 5 --- COMMENTS AND WATCHLIST

Implement:

-   Comments
-   User/article relationships
-   Watchlist
-   Authenticated interactions
-   Required REST endpoints
-   Corresponding frontend UI

Test the database relationships carefully.

------------------------------------------------------------------------

## PHASE 6 --- PROFILE MANAGEMENT AND IMAGE UPLOAD

Implement:

-   Client-side profile management
-   Profile UI
-   Image upload through Axios
-   Profile update flow
-   Proper authenticated handling

Keep the feature within the project description.

------------------------------------------------------------------------

## PHASE 7 --- REAL-TIME API BEHAVIOR

Implement the required real-time API behavior for the news platform.

Keep this implementation focused and production-oriented.

Do not expand the scope beyond what is required.

------------------------------------------------------------------------

## PHASE 8 --- UI POLISH

Perform a complete UI pass.

Improve:

-   Visual hierarchy
-   Spacing
-   Typography
-   Article presentation
-   Navigation
-   Forms
-   Authentication screens
-   Profile
-   Comments
-   Watchlist
-   Responsive behavior
-   Loading states
-   Empty states
-   Error states

The final result should feel like a polished production product.

------------------------------------------------------------------------

## PHASE 9 --- PERFORMANCE OPTIMIZATION

Review the complete application for:

-   Page-load performance
-   Client-side routing efficiency
-   React rendering efficiency
-   API efficiency
-   MongoDB query efficiency
-   Indexing
-   Image handling
-   Unnecessary requests
-   Unnecessary rendering
-   Bundle/runtime inefficiencies

Optimize only where justified.

The goal is to support the project's stated **35% page-load improvement
target**.

------------------------------------------------------------------------

## PHASE 10 --- FINAL ENGINEERING REVIEW

Before declaring the project complete:

### Architecture Review

Verify:

-   Production-level folder structure
-   Clear separation of concerns
-   No unnecessary files
-   No unnecessary technologies
-   No unrelated features

### Frontend Review

Verify:

-   TypeScript
-   React.js
-   Tailwind CSS
-   Responsive UI
-   Routing
-   Authentication flow
-   Articles
-   Comments
-   Watchlist
-   Profile management
-   Image upload

### Backend Review

Verify:

-   Node.js
-   Express.js
-   TypeScript
-   MongoDB
-   Mongoose
-   REST APIs
-   JWT authentication
-   Middleware
-   Controllers
-   Models
-   Services where genuinely required
-   Error handling

### Final Quality Review

Check for:

-   TypeScript errors
-   Build errors
-   Runtime errors
-   Broken imports
-   Broken routes
-   Broken API calls
-   Authentication issues
-   Database issues
-   Responsive layout problems
-   Obvious security issues
-   Unnecessary dependencies
-   Scope creep

Fix issues before completion.

------------------------------------------------------------------------

# 21. STRICT SCOPE CONTROL

This is extremely important.

**Do not add features because they are common in news applications.**

Do not independently decide to add:

-   Admin dashboard
-   AI features
-   Chatbot
-   Recommendation engine
-   Social login
-   Google authentication
-   Email authentication
-   Notifications
-   Subscription system
-   Payment system
-   Advertising system
-   Analytics dashboard
-   Multi-language system
-   Role-management system
-   Microservices
-   Redis
-   Docker
-   Kubernetes
-   GraphQL
-   WebSockets as a separate technology choice
-   Third-party authentication
-   Unspecified external services

unless they are explicitly required by this prompt.

Do not expand the product.

**Follow the provided project description exactly.**

------------------------------------------------------------------------

# 22. NO STACK DRIFT

The mandatory stack is:

``` text
Node.js
React.js
TypeScript
Express.js
MongoDB
Tailwind CSS
JWT
```

Do not replace anything.

Do not silently introduce alternatives.

If a dependency is technically necessary for normal implementation of
one of these technologies, keep it minimal and directly related to the
required functionality. Do not turn supporting dependencies into
additional project technologies or architectural choices.

------------------------------------------------------------------------

# 23. FILE CREATION RULES

Before creating files:

1.  Understand where the file belongs.
2.  Check whether the functionality already exists.
3.  Reuse existing code when appropriate.
4.  Avoid duplicate files.
5.  Avoid duplicate components.
6.  Avoid unnecessary abstractions.
7.  Keep naming consistent.

Do not create random files at the project root.

Do not put frontend code inside the backend.

Do not put backend code inside the frontend.

------------------------------------------------------------------------

# 24. IMPLEMENTATION RULE

For every phase:

1.  Implement only that phase.
2.  Check the existing project structure.
3.  Run appropriate checks/builds.
4.  Fix errors.
5.  Verify that existing functionality still works.
6.  Keep the architecture clean.
7.  Then continue to the next phase.

Do not skip directly to the final implementation without maintaining the
architecture.

------------------------------------------------------------------------

# 25. IMPORTANT --- DO NOT FABRICATE RESULTS

The resume/project description contains performance and engagement
metrics:

-   **35% reduction in page-load times**
-   **Estimated 40% improvement in user engagement metrics**

These are project-description targets/claims.

Do not fabricate benchmark results.

If actual measurements are available, report them accurately.

If measurements are not available, describe the implementation as
optimized toward the stated targets rather than inventing test results.

------------------------------------------------------------------------

# 26. FINAL PROJECT STANDARD

The final project should look and feel like it was developed by a
professional engineering team.

It must have:

-   Production-level architecture
-   Production-level folder structure
-   Clean TypeScript
-   Modular React components
-   Modular Express backend
-   MongoDB/Mongoose data modeling
-   JWT authentication
-   RESTful APIs
-   Real-time API behavior
-   Comments
-   Watchlist
-   Profile management
-   Image upload through Axios
-   Responsive design
-   Beautiful and unique UI
-   Performance-conscious implementation
-   Clean error/loading/empty states
-   Maintainable code
-   No unnecessary features
-   No technology-stack changes

------------------------------------------------------------------------

# 27. FINAL INSTRUCTION TO ANTIGRAVITY

**Follow this prompt literally and strictly.**

Do not reinterpret the product into a different application.

Do not add features based on your own assumptions.

Do not change the technology stack.

Do not add unrelated technologies.

Do not simplify the architecture into a beginner/demo project.

Do not over-engineer outside the defined requirements.

Build **Next News** as a professional production-level full-stack news
platform using exactly the specified stack and project requirements.

Work phase-by-phase.

Maintain the architecture throughout development.

Prioritize correctness, security, maintainability, performance,
responsiveness, and UI quality.

Before finishing, perform a complete architecture, functionality, build,
responsiveness, security, and scope review.

**The project description is the source of truth.**

# Architecture proposal for domain and UI layer of Gatsby application

## Why?

Gatsby's own architecture has a GraphQL layer that's responsible for providing data to the actual app.
We could have several points of contact with this layer:
- query in page
- query in template
- `useStaticQuery` hook

These points of contact can be used in various places and by the design of the framework they're coupled with
components. Such approach can be just fine for small applications, however for situation when we're dealing with a
bigger topic or we know that our app would grow and be maintained for a long time, we could need a way to organize a
 way of acquiring all needed information from the data sources. 
Another goal is to have view components independent from source data structures and to have a possibility of 
not-that-invasive way of mocking the data (for example if we want to work on the UI without having proper data source). 

Some extra benefit would be to have our UI separated from Gatsby itself so if some time in the future there would be
 a decision to go with different framework it won't be needed to write everything from scratch. Of course, it could
never happened, however if it's not expensive, it's always good to be prepared (at least in some way) for unpredictable
 things.

## What?

To achieve that we could use some abstraction to separate actual data transport from data usages. Having just one
approach for handling incoming data, processing them etc, and as a result having our components lighter and cleaner
seems like a good way to go.
That would also help with much easier mocking mechanism without need of manipulating actual views. we can just inject
mocks directly in this new abstraction.

## How? 

UI layer in Gatsby apps is based on React. Thus, we can use React Context API to prepare those normalized points of
contact with GraphQL data. We would also use kind of domain approach and prepare some kind of bounded contexts.

Let's take this file structure:
```
/src
    /features
    /hooks
    /mocks
    /pages
    /providers
    /templates
```
- `features` - is a representation of bounded context. All things related to specific feature (domain) would exist
 here. That includes:
    - `components` - React components, with as less logic as possible, just presentation. However GraphQL fragments
     for the data needed on specific component could be defined here (note: I'm thinking about moving fragments to
      separate place inside a feature) 
    - `hooks` - put feature specific logic here, think of them as of helpers
    - `mappers` - pure functions to map raw source data (from queries) into domain models
    - `types.ts` - definitions of feature types, models (note: for models we could also use separate structure) 
- `hooks` - common hooks, should be treated more like utils
- `mocks` - mocked domain data, can be used if app is running in mock mode
- `pages` - Gatsby's folder with definitions of pages, will elaborate on this later
- `providers` - declarations of context providers for our domains. Here actual React Contexts are defined and
 provider components are implemented. Each provider would have its own state and would expose specific API to get and
  set the data (but limited to!)
- `templates` - place for templates for all build time generated pages. Templates go with similar approach as page, 
so please, find more details below

### Containers

Each page and template should be treated as a container. Just a place for retrieving the data and setting it in a
proper domain context. 

Structure of a container should follow Gatsby rules, so it should have a simple component declaration and a GraphQL
query.

Component itself should just use a custom hook from a `feature` (or any other way of mapping the data and setting it
 to the domain state) and rendering root component for given page. Keep it as simple as possible.
 
### GraphQL queries

As is mentioned above queries can be ran basically from anywhere we want. Introducing context providers as single
 points of contact should prevent us from doing so. However, eventually, especially in a bigger project, queries can be
large, queries can contain duplicated code etc. Thus, I suggest to use query fragments as much as possible. They can
 be defined in the same place as a component that uses given data or (and that's maybe even better) in a separate
place (like `src/feature/feature-name/fragments`). This way or another, fragments can be then used in proper queries
 defined for page or template.
 
By doing so, our containers are not heavy and queries themselves should be much easier to understand. And if various
 queries would return same partial of data, then when needed to change the data shape, it could be done just in one
place (fragment), not in every query.

### Mocks

For bigger apps and ones that are developed for a long time, and that are provided with data from many external
 sources, it's always good to have an option for easy mocking those data.
 
That could be helpful if data source is not ready yet or is not decided where data should come from, but it's already
 known what kind of a data would be needed (for example: we know that we're building a gallery so we would need a
 picture URL, name and id).
 
In that kind of a situation mocks allow developers to work on the app without thinking (for now, of course) about
 actual data source. Important thing is to have mocks injected lower than actual UI.
 
That's why I prepared a proof-of-concept of a wrapper around `useState` hook - `usePageState`.
This generic util is created via a composition with mocks object passed to. Then, everywhere where data comes from
 GraphQL, mapped and passed up to domain context, by just setting one option, app could work using mocked data.
The mechanism checks if environmental variable `GATSBY_USE_MOCKS` is set to `true`. If so, then it looks for mock for
 given page and if it exists, this is what is set to the state. 

There are, however, some trade-offs:
- usage is not that straightforward as with normal `useState`:
    ```
    usePageState<"photos">("photos", [])  
    ```
  As you can see, one must pass string as a type param and same string has to be passed as a actual hook param.
- also, in actual implementation (not the PoC), actual setter from the domain context should be passed somehow to the
 hook. For example, like that:
    ```
    const [state, setState] = usePageState<page>(domainSetState)(page, null) 
    ```

Of course, injecting mocks can be done semi-manually, like this, in a domain context:
    ```
    const [state, stateSetter] = useState(null) 
    const setState = useCallback(
      (photo: Nullable<Photo>) => {
        if (process.env.GATSBY_USE_MOCKS === "true") {
          stateSetter(mocks.photo)
        } else {
          stateSetter(photo)
        }
      },
      [],
    )
    ```


# Dmitriy Likhten's interview challenge submission for utilizecore

## Running

to run the server:

```bash
> cd api
> cp .env.example .env
# optional if you have rvm installed, follow the "rvm install" instructions that rvm spits out, and then "rvm use"
> bundle install
> rake db:create db:migrate db:seed
> rails s # run the api server, on localhost:3000
> rake # run tests
```

to run the front-end:

```bash
> cd frontend
> cp .env.local.example .env.local
# optional if you have nvm installed, follow the "nvm use" instructions that nvm spits out
> npm install
> npm run dev  # run the front-end, on localhost:3001
```

Critical note on commits:

If you're running `nvm`, you have to be in command-line to submit the commit, I haven't fully figured out how to
get husky to correctly run in tools like SourceTree to be able to automatically invoke prettier (I love prettier on commit).

## Architectural notes

I cheated a slight bit here, I already had an architecture that I really enjoyed making, so rather than starting
from scratch, I copied over the critical aspects of the architecture. Therefore you might see a few functions
sprinkled here and there which aren't needed for such a simple example, but happen to be really convenient for more
complex cases.

I also didn't go for 100% test coverage to save time, but handled the critical scenarios mainly around data integrity
and form operations where things could go wrong.

### Backend

The general architecture is using [json-api](https://jsonapi.org/) along with [graphiti](https://www.graphiti.dev)
which handles the api -> frontend communication protocol. The front-end uses the spraypaint framework provided by
graphiti.

The general approach I do here is:

- standard resources for data pulls, and relationship graphs
- form resources for all actions, including form submission.

This may seem a bit overkill for such a simple problem, but I wanted to show off a bit of architecting. The approach
really shines when forms have more than just a simple object CRUD. For example if a trip consisted of multiple records
like `trip -> estimate, trip -> location -> [owner, address]` and it all needed to be submitted together, using this form
pattern makes encapsulating both the action and the form hydration remove all knowledge of correct submission patterns
and how to correctly query the data to hydrate the form.

With this approach, a form can create (no id given), update (an id is given of the top level object), and get/hydrate
(provide the id during a get operation on the form, to for example fill out an edit form with correct data in the
expected structure). While graphiti does give the concept of "side-posting" to allow one form submission to create a
complex relationship graph, I feel that it puts too much knowledge into the front-end about how to correctly submit
forms. The form pattern keeps the front-end really dumb, which makes it much easier to manage long-term.

This also makes testing really simple. Since the form is just a plain ol' ruby object with a few helper methods, we can
trivially test it. Resource testing can be really simple since most of the logic will already be tested in the form/action
objects.

Regarding actions, I feel that sticking with the form pattern for simple actions still has benefits because it keeps the
overall architecture consistent and each action can easily be extended with more attributes later if necessary (for example
there will be almost trivial changes if we wanted to add an assignee_id for the start action, and very easy to find out
where the code responsible is).

Regarding state management, personally I like avoiding putting too much management code into the models, reason is that
usage of state transition is usually pretty contextual. Imagine, for example, we had an admin tool that allowed you to
update the state to any state, from any state, and manually set all timestamps. This would violate the existing actions
where you can only transition from say non-started -> in-progress, but because we can move this to contextual tools there
would be no problems. Furthermore if these transitions start to get many in nature, I would create a state manager service
that takes in a trip and gives all sort of operations on how it can move the state. Also these actions typically have
side-effects like sending out an email, and contextual actions are far better at managing when to invoke those without
having to worry about which model lifecycle hook will end up getting triggered.

### Frontend

The general architecture is

- next.js (react, typescript)
- spraypaint (api communication management)
- useSWR (data request framework, it is amazing)
- tailwindcss (I personally really like this for managing css in react)
- formik for form management (again a really great framework to keep forms simple)
- dayjs for date/timezone processing

I avoided all pagination work, and I know this will definitely cause us to be unable to select any assignee past the api
page limit, or see more than the page limit of trips, but this is just to save implementation time. Also if I was to
implement pagination, I'd need to implement a complex select for users, or some sort of search component and to save time
I didn't do that here.

I also didn't implement anything for a calendar / time selector, so it uses `<input type="datetime-local"` which
has lots of limitations, and has some issues with pre-filling values. This saves a bunch of time on finding a
library and integrating it.

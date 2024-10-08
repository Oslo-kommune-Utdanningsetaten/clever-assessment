# Clever assessment

## Probably a better name: VV2 (Vurdering versjon 2)

A clickable experiment on what an assessment app in Osloskolen could look like

## Up and running

- git clone this repo
- cd into folder
- npm install
- Ensure that you have the correct .env file (including supabase url + key)
- npm run dev

## Todo

- [x] head/title stuff
- [x] svg favicon
- [x] landing page logged in conditional
- [x] currentUser store
- [x] currentUser switcher
- [x] Teaching groups
- [x] Assessment contexts
  - [x] Alle vurderingssituasjoner (assessment_context) for en undervisningsgruppe (teaching_group)
  - [x] Tabell med alle elever (user) og en kolonne for hver vurderingssituasjon (assessment_context)
- [x] skru litt om på datamodellen
- [x] show assessments in table
- [x] Assessment create
  - [x] with assessmentFormat
  - [x] change content type based on assessmentFormat
- [x] Assessment edit
- [ ] Alle vurderinger (assessment) i én vurderingssituasjon
- [ ] Assessment draft storage
- [ ] Assessment publish_at
- [ ] Assessment details
- [ ] Assessment styles
- [ ] AssessmentContext create/edit/delete
- [ ] Student: My assessments
- [ ] Student: Self assessment
- [ ] Variant table of assessments within teaching group

## docs

- Template: https://github.com/cowboycodr/kiankit/
- https://learn.svelte.dev/tutorial/welcome-to-svelte
- https://kit.svelte.dev/docs/introduction
- https://tailwindcss.com/docs/text-wrap
- https://ui.shadcn.com/docs/v0
- https://lucide.dev/icons/
- https://docs.feide.no/reference/apis/groups_api/group_types/pse_teaching.html
- https://supabase.com/docs/guides/getting-started

### system color

#059466 (a dark greenish tint)

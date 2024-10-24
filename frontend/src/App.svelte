<script lang="ts">
	import { Router, Link, Route } from 'svelte-routing'
	import Assessment from './routes/Assessment.svelte'
	import Assessments from './routes/Assessments.svelte'
	import Group from './routes/Group.svelte'
	import Groups from './routes/Groups.svelte'
	import Index from './routes/Index.svelte'

	export let url = ''
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link>
		<Link to="/assessments">Assessments</Link>
		<Link to="/groups">Groups</Link>
	</nav>
	<div>
		<Route path="/assessments/:id" component={Assessment} />
		<Route path="/assessments" component={Assessments} />
		<Route path="/groups/:id" component={Group} />
		<Route path="/groups" component={Groups} />
		<Route path="/" component={Index} />
	</div>
</Router>

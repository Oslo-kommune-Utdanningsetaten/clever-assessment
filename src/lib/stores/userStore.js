// @ts-nocheck
import { get, writable } from 'svelte/store'

const initialTestUser = {
  id: 'A1',
  name: 'Monsieur Test',
  is_admin: false
}
export let selectedTestUser = writable(initialTestUser)

// Whenever selectedTestUser changes
selectedTestUser.subscribe((user) => {
  console.log('userStore: selectedTestUser changed to', user)
})

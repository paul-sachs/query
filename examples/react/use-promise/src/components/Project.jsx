import React from 'react'
import { useQuery } from '@tanstack/react-query'

import Button from './Button'
import Spinner from './Spinner'

import { fetchProject } from '../queries'

export default function Project({ activeProject, setActiveProject }) {
  const { data, isFetching, promise } = useQuery({
    queryKey: ['project', activeProject],
    queryFn: () => fetchProject(activeProject),
  })

  console.log('before', JSON.stringify(promise))
  const newData = React.useDeferredValue(
    promise === undefined ? {} : React.use(promise),
  )
  console.log('after', JSON.stringify(promise))

  console.log({ newData })

  return (
    <div>
      <Button onClick={() => setActiveProject(null)}>Back</Button>
      <h1>
        {activeProject} {isFetching ? <Spinner /> : null}
      </h1>
      {data ? (
        <div>
          <p>forks: {data.forks_count}</p>
          <p>stars: {data.stargazers_count}</p>
          <p>watchers: {data.watchers}</p>
        </div>
      ) : null}
      <br />
      <br />
    </div>
  )
}

// 1
import gql from 'graphql-tag'

// 2
export const ALL_LINKS_QUERY = gql`
query findTodos {
    todos {
      text
      done
      user {
        name
      }
    }
}
`

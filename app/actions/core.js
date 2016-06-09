//mapping from entity kind to entity base endpoint location
const entityKindMap = {
  'D': '/documents',
  'F': '/folders',
  'B': '/binders',
  'W': '/workspaces',
  'QS': '/quicksearch'
};

/** Get entity base endpoint location depending on its kind.
  @param entity {object}
  @param user {object} : connected user (required only for views).
  @return (string) base URL endpoint for web-service entity
*/
export const getEntityEndpoint = (entity, user) => {
  if (entity) {
    return entityKindMap[entity.EntityKindAsString] || `/workspaces/${user}/views`;
  }
  return '';
}

/** Get entity identifier used for web-service entity
  @param entity {object}
  @return (string) identifier of 'real' targeted entity
*/
export const getEntityIdentifier = (entity) => entity.IsShortcut ? entity.TargetEntityId : entity.Id;

/** SELECTORS */

//select config from state
export const selectConfig = (state) => state.config;

//select JWT session token from state
export const selectToken = (state) => state.session.token;

const Document = require('./Document')
const { cozyClient } = require('./testUtils')

class Simpson extends Document {}
Simpson.doctype = 'io.cozy.simpsons'
Simpson.idAttributes = ['name']

describe('Document', () => {
  let queryResult = []
  beforeAll(() => {
    cozyClient.data.query.mockImplementation(() => Promise.resolve(queryResult))
    Document.registerClient(cozyClient)
  })

  afterAll(() => {
    Document.registerClient(null)
  })

  it('should do bulk delete', async () => {
    await Simpson.deleteAll([
      { _id: 1, name: 'Marge' },
      { _id: 2, name: 'Homer' }
    ])
    expect(cozyClient.fetchJSON).toHaveBeenCalledWith(
      'POST',
      '/data/io.cozy.simpsons/_bulk_docs',
      {
        docs: [
          { _deleted: true, _id: 1, name: 'Marge' },
          { _deleted: true, _id: 2, name: 'Homer' }
        ]
      }
    )
  })
})


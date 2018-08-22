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

  it('should do create or update', async () => {
    const marge = { name: 'Marge' }
    await Simpson.createOrUpdate(marge)
    expect(cozyClient.data.query).toHaveBeenCalledWith(
      expect.anything(),
      {
        selector: {
          name: 'Marge'
        }
      }
    )
    expect(cozyClient.data.create).toHaveBeenCalledTimes(1)
    expect(cozyClient.data.updateAttributes).toHaveBeenCalledTimes(0)
    queryResult = [{  _id: 5, ...marge }]
    await Simpson.createOrUpdate(marge)
    expect(cozyClient.data.create).toHaveBeenCalledTimes(1)
    expect(cozyClient.data.updateAttributes).toHaveBeenCalledTimes(1)
  })

  it('should do bulk fetch', async () => {
    await Simpson.fetchAll()
    expect(cozyClient.fetchJSON).toHaveBeenCalledWith(
      'GET',
      '/data/io.cozy.simpsons/_all_docs?include_docs=true'
    )
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


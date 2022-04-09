import { rest } from 'msw';

export const handlers = [
    rest.get(`${process.env.REACT_APP_API}cocktails/ingredients/categories`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
              {"category": "Spirits"}, 
              {"category": "Fortified wines"}, 
              {"category": "Bitters"},
               {"category": "Garnishes"}, 
               {"category": "Fruit juices"}, 
               {"category": "Sweeteners"}, 
               {"category": "Liqueurs"}
            ])
        )
    }),
    rest.get(`${process.env.REACT_APP_API}cocktails/ingredients/spirits`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {"id": 1, "name": "Gin", "category": "Spirits"}, 
          {"id": 8, "name": "Rye whiskey", "category": "Spirits"}, 
          {"id": 13, "name": "Tequila", "category": "Spirits"}, 
          {"id": 16, "name": "White rum", "category": "Spirits"}
        ])
      )
    })
]
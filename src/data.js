export default {
  name: 'Colour',
  children: [
    {
      name: 'Black',
    },
    {
      name: 'Blue',
      children: [
        {
          name: 'Aquamarine',
          children: [
            {
              name: 'Sushi',
              children: [
                {
                  name: 'Android',
                  children: [
                    {
                      name: 'Lollipop',
                      children: [
                        {
                          name: '5.0',
                          children: [
                            {
                              name: '5.0.1',
                              children: [
                                {
                                  name: 'Android One',
                                  children: [
                                    { name: 'Mi A1' },
                                    {
                                      name: 'Mi A2',
                                      children: [
                                        { name: 'Gold',
                                        children: [
                                          {name:'32GB@4GB'},
                                          {name: '64GB@4GB'}
                                        ]
                                    },
                                        { name: 'Lake Blue' },
                                        { name: 'Black' },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  name: 'Mi UI',
                                  children: [
                                    { name: 'Mi 5X' },
                                    { name: 'Mi 6X' },
                                  ],
                                },
                              ],
                            },
                            { name: '5.0.2' },
                          ],
                        },
                        { name: '5.1', children: [{ name: '5.1.1' }] },
                      ],
                    },
                    {
                      name: 'Marshmallow',
                    },
                  ],
                },
                {
                  name: 'iOS',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Cyan',
        },
        {
          name: 'Navy',
        },
        {
          name: 'Turquoise',
        },
      ],
    },
    {
      name: 'Green',
    },
    {
      name: 'Purple',
      children: [
        {
          name: 'Indigo',
        },
        {
          name: 'Violet',
        },
      ],
    },
    {
      name: 'Red',
      children: [
        {
          name: 'Crimson',
        },
        {
          name: 'Maroon',
        },
        {
          name: 'Scarlet',
        },
      ],
    },
    {
      name: 'White',
    },
    {
      name: 'Yellow',
    },
  ],
}

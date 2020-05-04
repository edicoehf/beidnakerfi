export const views = {
  superSeller: ['/cheques', '/createcheque', '/createuser', '/viewusers'],
  superBuyer: ['/cheques', '/createuser', '/createdepartment', '/viewusers'],
  seller: ['/cheques', '/createcheque'],
  buyer: [],
};

export const sidebarButtons = {
  BasicSeller: {
    buttons: [
      { name: 'Ný beiðni', path: '/createcheque', pressed: true },
      { name: 'Yfirlit beiðna', path: '/cheques', pressed: false },
    ],
  },
  SuperBuyer: {
    buttons: [
      { name: 'Yfirlit beiðna', path: '/cheques', pressed: true },
      { name: 'Skrá deild', path: '/createdepartment', pressed: false },
      { name: 'Skrá starfsmann', path: '/createuser', pressed: false },
      { name: 'Starfsmannalisti', path: '/viewusers', pressed: false },

    ],
  },
  SuperSeller: {
    buttons: [
      { name: 'Ný beiðni', path: '/createcheque', pressed: true },
      { name: 'Yfirlit beiðna', path: '/cheques', pressed: false },
      { name: 'Skrá starfsmann', path: '/createuser', pressed: false },
      { name: 'Starfsmannalisti', path: '/viewusers', pressed: false },

    ],
  },
};

export const statusCodes = {
  0: 'Hætt við',
  1: 'Stofnuð',
  2: 'Ógreitt',
  3: 'Greitt',
};

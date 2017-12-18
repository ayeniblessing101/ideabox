global.$ = () => ({
  tabs: () => null,
  attr: () => null,
  sideNav: () => null,
  modal: () => null,
  parallax: () => null,
  show: () => null,
  hide: () => null,
  dropdown: () => null,
  tooltip: () => null,
  click: () => null,
  material_select: () => null,
});

global.tinymce = {
  remove: () => null,
  init: () => null,
  activeEditor: {
    getContent: () => null,
  },
};

global.e = {
  target: {
    name: 'input',
    value: 'input',
  },
};

// global._ = {
//   forEach: () => null
// };

global.swal = () => Promise.resolve(true);

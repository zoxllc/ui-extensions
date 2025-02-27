import {extend, Modal} from '@shopify/admin-ui-extensions';

extend('Playground', (root) => {
  const modal = root.createComponent(Modal, {
    title: 'The best modal',
    onClose: () => console.log('modal closed!'),
    open: true,
  });

  modal.appendChild('This is the content of the modal.');
  root.appendChild(modal);

  root.mount();
});

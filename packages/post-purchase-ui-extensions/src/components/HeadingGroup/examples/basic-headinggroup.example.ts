import {extend, HeadingGroup, Heading, View} from '@shopify/post-purchase-ui-extensions';

extend('Checkout::PostPurchase::Render', (root) => {
  const headingGroup = root.createComponent(View, undefined, [
    root.createComponent(Heading, undefined, 'Hi John Doe! (h1)'),
    root.createComponent(HeadingGroup, undefined, [
      root.createComponent(Heading, undefined, 'Your account (h2)'),
      root.createComponent(HeadingGroup, undefined, [
        root.createComponent(Heading, undefined, 'Change Password (h3)'),
      ]),
    ]),
  ]);

  root.appendChild(headingGroup);
});

# Link

Link makes text interactive so customers can perform an action, such as navigating to another location.

## Props
optional = ?

| Name | Type | Description |
| --- | --- | --- |
| to? | <code>string</code> | Destination to navigate to. You must provide either this property, `onPress`, or both. |
| external? | <code>boolean</code> | Open the link in a new window or tab |
| id? | <code>string</code> | Unique identifier.<br /><br />Typically used as a target for another component’s controls to associate an accessible label with an action. |
| language? | <code>string</code> | Indicate the text language. Useful when the text is in a different language than the rest of the page. It will allow assistive technologies such as screen readers to invoke the correct pronunciation. [Reference of values](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (&#34;subtag&#34; label) |
| accessibilityLabel? | <code>string</code> | A label used for buyers using assistive technologies. When set, any 'children' supplied to this component are hidden from being seen for accessibility purposes to prevent duplicate content from being read. |
| appearance? | <code>"monochrome"</code> | Specify the color of the link. `monochrome` will take the color of its parent.<br /><br /><code>"monochrome"</code>: Takes the color of its parent. |
| onPress? | <code>() => void</code> | Callback when pressed. If `to` is set, it will execute the callback and then navigate to the location specified by `to`. |
| overlay? | <code>RemoteFragment</code> | An overlay component to render when the user interacts with the component. |
import { useRef, useEffect } from 'react';

/**
 * Detecting outside click on a react component is surprisingly hard.
 * A general approach is to have a global click handler on the document
 * which checks if the click target is inside the editor container or
 * not using editorContainer.contains(e.target). This approach works well
 * until portals are used for editors. Portals render children into a DOM
 * node that exists outside the DOM hierarchy of the parent component so
 * editorContainer.contains(e.target) does not work. Here are some examples
 * of the DOM structure with different types of editors
 *
 *
 * SimpleEditor for example Texbox (No Portals)
 *   <div data-grid>..</div>
 *   <div portal-created-by-the-grid-for-editors>
 *      <div editor-container>
 *        <div simple-editor>..</div>
 *      </div>
 *   </div>
 *
 * ComplexEditor for example Modals (using Portals)
 *   <div data-grid>..</div>
 *   <div portal-created-by-the-grid-for-editors>
 *      <div editor-container>
 *        // Nothing here
 *      </div>
 *   </div>
 *   <div portal-created-by-the-editor>
 *     <div complex-editor>..</div>
 *   </div>
 *
 *
 * One approach to detect outside click is to use synthetic event bubbling through
 * portals. An event fired from inside a portal will propagate to ancestors
 * in the containing React tree, even if those elements are not ancestors
 * in the DOM tree. This means a click handler can be attached on the window
 * and on the editor container. The editor container can set a flag to notify
 * that the click was inside the editor and the window click handler can use
 * this flag to call onClickOutside. This approach however has a few caveats
 * - Click handler on the window is set using window.addEventListener
 * - Click handler on the editor container is set using onClick prop
 *
 * This means if a child component inside the editor calls e.stopPropagation
 * then the click handler on the editor container will not be called whereas
 * the document click handler will be called.
 * https://github.com/facebook/react/issues/12518
 *
 * To solve this issue onClickCapture event is used.
 */

export function useClickOutside(onClick: () => void) {
  const frameRequestRef = useRef<number | undefined>();

  function cancelAnimationFrameRequest() {
    if (typeof frameRequestRef.current === 'number') {
      cancelAnimationFrame(frameRequestRef.current);
      frameRequestRef.current = undefined;
    }
  }

  // We need to prevent the `useEffect` from cleaning up between re-renders,
  // as `handleDocumentClick` might otherwise miss valid click events.
  // To that end we instead access the latest `onClick` prop via a ref.
  const onClickRef = useRef((): void => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    onClickRef.current = onClick;
  });

  useEffect(() => {
    function onOutsideClick() {
      frameRequestRef.current = undefined;
      onClickRef.current();
    }

    function onWindowCaptureClick() {
      cancelAnimationFrameRequest();
      frameRequestRef.current = requestAnimationFrame(onOutsideClick);
    }

    window.addEventListener('click', onWindowCaptureClick, { capture: true });

    return () => {
      window.removeEventListener('click', onWindowCaptureClick, { capture: true });
      cancelAnimationFrameRequest();
    };
  }, []);

  return cancelAnimationFrameRequest;
}

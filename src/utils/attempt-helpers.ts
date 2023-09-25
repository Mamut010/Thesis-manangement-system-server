export function getElementWithLatestAttemptNo<T>(src: T[], attemptNoSelector: (ele: T) => number): T | undefined {
    if (src.length === 0) {
        return undefined;
    }

    return src.reduce((ele1, ele2) => {
        return attemptNoSelector(ele1) > attemptNoSelector(ele2) ? ele1 : ele2;
    });
}
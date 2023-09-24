export const Instructions = ({
    expanded,
}) => {
    return (
        <div className='instructions'>
            <h3>Instructions</h3>
            {expanded
                ? <>
                    <p>
                        The operations can be chained with, but you must click the equal sign to calculate the current operation first ("=")
                    </p>
                    <p>
                        Clicking the "Clear" operator removes the whole memory (Full clean)
                    </p>
                </>
                : null}
        </div>
    );
};
const CalculatorRow = (props) => {
    const nums = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [0, '.', '=']];

    return (
        nums.map((numArr, index) => {
            return (
                <div className="row" key={('00' + index).slice(-2)}>
                    {numArr.map((n) => {
                        return (
                            <button>{n}</button>
                        );
                    })}
                </div>
            );
        })
    );

};

export default CalculatorRow;
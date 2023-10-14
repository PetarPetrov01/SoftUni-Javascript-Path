export const Row = ({
    name,
    age,
    _id
}) => {
    return (
        <div style={{ display: "flex", gap: "30px" }}>
            <span>
                Name: {name}
            </span>

            <span>
                Age : {age}
            </span>
        </div>
    )
}
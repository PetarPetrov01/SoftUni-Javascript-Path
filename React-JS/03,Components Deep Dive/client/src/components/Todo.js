export default function Todo({
    text,
    isCompleted,
    toggleCompletion,
    _id
}) {
    return (
        <tr className={`todo${isCompleted ? ' is-completed' : ''}`}>
            <td>{text}</td>
            <td>{isCompleted ? 'Completed' : 'Not Completed'}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => toggleCompletion(_id)}>Change status</button>
            </td>
        </tr>
    )
}
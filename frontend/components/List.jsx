export const List = (props) => {
  return (
    <div className="flow-root">
      <div className="text-center font-bold text-lg">
        {props.title || 'Lists'}
      </div>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {props.lists &&
          props.lists.map((list) => (
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Name: {list[0]}
                  </p>
                  <p className="text-sm truncate">Role: {list[1]}</p>
                  <p className="text-sm truncate">
                    Access: {list[2] ? 'True' : 'False'}
                  </p>
                </div>
                <button
                  onClick={() => props.changeUserAccess(list[3])}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full inline-flex items-center text-base font-semibold"
                >
                  Change Access
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

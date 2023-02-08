import { useEffect, useState } from "react"
import { List } from "./List"

export const AddRole = (props) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    props.allUsers().then((data) => {
      console.log(data)
      setAllUsers(data)
      console.log(allUsers)
    })
  }, [])

  const onSave = () => {
    props.addUser(name, address, role)
  }

  const onCancel = () => {
    setName('');
    setAddress('');
    setRole('');
  }

  return (
    <div className="flex items-center gap-16">
    <List title={"Users"} lists={allUsers} changeUserAccess={props.changeUserAccess} />

    <div className="p-8 rounded border border-gray-200">
      <h1 className="font-medium text-3xl">Add User</h1>
        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter your name"
              value={name}
              onChange={((event) => setName(event.target.value))}
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Ether account Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              value={address}
              placeholder="0x4417089422EB07e5548670E3de4Cd7A4df2f728C"
              onChange={((event) => setAddress(event.target.value))}
            />
          </div>

          <div>
            <label
              htmlFor="countries"
              className="text-sm text-gray-700 block mb-1 font-medium"
            >
              Select Role
            </label>
            <select
              id="countries"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="" disabled selected hidden>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Farmer">Farmer</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Quality Checker">Quality Checker</option>
              <option value="Wholeseller">Wholeseller</option>
              <option value="Retailer">Retailer</option>
            </select>
          </div>
        </div>

        <div className="space-x-4 mt-8">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            disabled={!name || !address || !role}
            onClick={onSave}
          >
            Save
          </button>
          <button className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50" onClick={onCancel}>
            Cancel
          </button>
        </div>
    </div>
    </div>
  )
}

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'

import './styles.css'
import rootNode from './data'

const cloneWithDepth = (object, depth = 5) => {
  if (depth === -1) return undefined
  if (typeof object !== 'object') return object

  if (Array.isArray(object)) {
    return object
      .map((val) => cloneWithDepth(val, depth - 1))
      .filter((val) => val !== undefined)
  }

  const clone = {}

  for (const key in object) {
    if (typeof object['key'] === 'object' && depth - 1 === -1) {
      continue
    }

    const clonedValue = cloneWithDepth(object[key], depth - 1)

    if (clonedValue !== undefined) {
      clone[key] = clonedValue
    }
  }

  return clone
}

const findNode = (key, node = rootNode, parentPath = []) => {
  const path = [...parentPath, node.name]

  if (node.name === key) {
    return { node: cloneWithDepth(node), path }
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findNode(key, child, path)

      if (found) return found
    }
  }
}
const App = () => {
  const [data, setData] = useState(cloneWithDepth(rootNode))
  const [path, setPath] = useState([rootNode.name])

  const changeNode = ({ node, path }) => {
    setPath(path)
    setData(node)
  }
  const handleClick = (_, key) => {
    changeNode(findNode(key))
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          {path.map((path) => (
            <button
              style={{
                margin: '0',
                border: 'none',
                outline: 'none',
                background: 'none',
                padding: '0 0.1rem',
                textDecoration: 'underline',
                cursor: data.name === path ? '' : 'pointer',
                color: data.name === path ? 'black' : 'blue',
              }}
              key={path}
              onClick={() => changeNode(findNode(path))}
            >
              {path}
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <Tree
          animated
          data={data}
          width={400}
          height={400}
          nodeRadius={15}
          gProps={{ className: 'node', onClick: handleClick }}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      </div>
    </React.Fragment>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

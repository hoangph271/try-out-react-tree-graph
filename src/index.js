import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'

import './styles.css'
import rootNode from './data'

const DEFAULT_DEPTH = 9
const cloneWithDepth = (object, depth = DEFAULT_DEPTH) => {
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

const useWindowInnerSize = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const hanldeResize = useCallback(() => {
    setInnerWidth(window.innerWidth)
    setInnerHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', hanldeResize)

    return () => window.removeEventListener('resize', hanldeResize)
  }, [hanldeResize])


  return {
    innerWidth,
    innerHeight,
  }
}

const App = () => {
  const [data, setData] = useState(cloneWithDepth(rootNode))
  const [path, setPath] = useState([rootNode.name])
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const { innerWidth, innerHeight } = useWindowInnerSize()
  const canvasWrapper = useRef(null)
  const setCanvasSize = useCallback(() => {
    const { clientWidth, clientHeight } = canvasWrapper.current

    setCanvasWidth(clientWidth)
    setCanvasHeight(clientHeight)
  }, [])

  useEffect(setCanvasSize, [setCanvasSize])

  useLayoutEffect(() => {
    setCanvasWidth(0)
    setCanvasHeight(0)
  }, [innerWidth, innerHeight])

  useEffect(() => () => {
    let isMounted = true

    requestAnimationFrame(() => isMounted && setCanvasSize())

    return () => isMounted = false
  }, [innerWidth, innerHeight, setCanvasSize])

  const changeNode = ({ node, path }) => {
    setPath(path)
    setData(node)
  }
  const handleClick = (_, key) => {
    changeNode(findNode(key))
  }

  return (
    <div style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div>
        <div>
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
      <div style={{ flexGrow: 1 }} ref={canvasWrapper}>
        <Tree
          animated
          data={data}
          width={canvasWidth}
          height={canvasHeight}
          nodeRadius={15}
          svgProps={{ style: { backgroundColor: 'lightgray' } }}
          gProps={{ className: 'node', onClick: handleClick }}
          margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import BarChart from './BarChart'
import TimeFrameSelector from './TimeFrameSelector'
import NYTAttribute from './NYTAttribute'

const MAX = 'MAX'
const MONTH = 'MONTH'
const WEEK = 'WEEK'

export default function ResultsDisplay(props) {
  const { className, data, displayName } = props

  const [activeTabId, setActiveTabId] = useState(MAX)

  function handleChange(e) {
    console.log('handleChange called in ', displayName, 'with', e.target.id)
    setActiveTabId(e.target.id)
  }

  const barChartData = useMemo(() => {
    if (activeTabId === WEEK) {
      return data.slice(-7)
    }
    if (activeTabId === MONTH) {
      return data.slice(-30)
    }
    if (activeTabId === MAX) {
      return data
    }
  }, [activeTabId, data])

  const timeFrames = [
    { id: WEEK, content: '7 days' },
    { id: MONTH, content: '30 days' },
    { id: MAX, content: 'Max' },
  ]

  return (
    data &&
    data.length > 0 && (
      <div className={cn('o-grid  u-border  u-padding-small', className)}>
        <h5 className="o-grid__item  u-1/1  u-margin-bot-small">{displayName}</h5>
        <div className="o-grid__item  u-1/1">
          <TimeFrameSelector
            activeTabId={activeTabId}
            name={displayName}
            onChange={handleChange}
            timeFrames={timeFrames}
          />
        </div>
        <div className="o-grid__item  u-1/1">
          <BarChart data={barChartData}></BarChart>
        </div>
        <NYTAttribute></NYTAttribute>
      </div>
    )
  )
}

ResultsDisplay.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      cases: PropTypes.number.isRequired,
      deaths: PropTypes.number.isRequired,
    })
  ).isRequired,
  displayName: PropTypes.string.isRequired,
}

ResultsDisplay.defaultProps = {
  className: '',
}
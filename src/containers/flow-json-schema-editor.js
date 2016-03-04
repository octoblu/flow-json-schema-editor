import React, { Component } from 'react'
import JsonSchemaForm from 'react-jsonschema-form'

export default class FlowJsonSchemaEditor extends Component {

  state = {
    nodeNumber: null,
    nodeSchema: {},
    flowData: {},
    nodeData: {}
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    const state = {}

    try {
      state[name] = JSON.parse(value);
      this.setState(state)
    } catch(e) {
      console.log('JSON parse failed at', e.message);
    }

    const { nodeNumber, flowData } = this.state

    const currentNode = flowData.nodes[nodeNumber]
    this.setState({nodeData: currentNode})
  }

  handleSubmit = () => {
    console.log('submitting')
  }

  render() {
    const { nodeSchema, nodeData } = this.state

    return <div>

      <h1>Node Number</h1>
      <input
        name='nodeNumber'
        onChange={this.handleChange}/>

      <h1>Node Schema</h1>
      <textarea
        rows='10'
        cols='100'
        name='nodeSchema'
        onChange={this.handleChange}/>

      <h1>Flow Data</h1>
      <textarea
        rows='10'
        cols='100'
        name='flowData'
        onChange={this.handleChange}/>

      <h1>Schema Output</h1>
      <JsonSchemaForm
        schema={nodeSchema}
        formData={nodeData}
        onSubmit={this.handleSubmit}/>
    </div>
  }
}

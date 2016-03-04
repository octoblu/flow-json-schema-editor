import React, { Component } from 'react'
import JsonSchemaForm from 'react-jsonschema-form'

export default class FlowJsonSchemaEditor extends Component {

  state = {
    nodeNumber: null,
    nodeSchema: null,
    flowData: {},
    nodeData: {},
    error: null
  }

  handleSchemaFieldChange = ({ target }) => {
    const { name, value } = target
    const state = {}

    try {
      state[name] = JSON.parse(value);
      state.error = null
    } catch(e) {
      this.setState({error: e})
      return;
    }

    this.setState(state)
  }

  handleNodeNumberFieldChange = ({ target }) => {
    const { value } = target
    const { flowData } = this.state

    if (flowData) {
      this.setState({
        nodeNumber: value,
        nodeData: flowData.nodes[value]
      })
    }
  }

  handleSchemaChange = ({ formData }) => {
    this.setState({nodeData: formData}, () => {
      const { flowData, nodeNumber } = this.state
      const newFlowData = flowData
      newFlowData.nodes[nodeNumber] = formData
      this.setState({flowData: newFlowData})
    })
  }

  render() {
    const { error, nodeSchema, nodeData } = this.state

    let jsonSchemaForm = null

    if (nodeSchema && !error) {
      jsonSchemaForm = <JsonSchemaForm
        schema={nodeSchema}
        formData={nodeData}
        onChange={this.handleSchemaChange}/>
    }

    return <div>

      <h3>Node Schema</h3>
      <textarea
        rows='10'
        cols='100'
        name='nodeSchema'
        onChange={this.handleSchemaFieldChange}/>

      <h3>Flow Data</h3>
      <textarea
        rows='10'
        cols='100'
        name='flowData'
        onChange={this.handleSchemaFieldChange}
        defaultValue={JSON.stringify(this.state.flowData)}
        value={JSON.stringify(this.state.flowData)}/>

      <h3>Node Number</h3>
      <input
        name='nodeNumber'
        onChange={this.handleNodeNumberFieldChange}/>

      <h3>Schema Output</h3>
      {jsonSchemaForm}
    </div>
  }
}

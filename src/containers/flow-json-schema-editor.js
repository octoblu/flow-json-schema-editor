import React, { Component } from 'react'
import JsonSchemaForm from 'react-jsonschema-form'
import request from 'superagent'
import brace from 'brace'
import AceEditor from 'react-ace'
import _ from 'lodash'

import 'brace/mode/javascript'
import 'brace/theme/github'

import { Message } from 'zooid-ui'
export default class FlowJsonSchemaEditor extends Component {

  componentDidMount() {
    var self = this
    request.get('https://s3-us-west-2.amazonaws.com/tool-schema-registry/latest/schema-registry.json', function(err, res){
      if (err) console.log(err)
      const parsedRes = JSON.parse(res.text)
      self.setState({schemaList: parsedRes})
    });
  }

  state = {
    schemaList: null,
    flowData: '',
    displaySchema: null,
    schemaData: null,
    error: null
  }

  handleSchemaChange = ({ formData }) => {
    const parsedFlowData = JSON.parse(this.state.flowData)
    parsedFlowData.nodes = _.values(formData)
    const updatedFlowData = JSON.stringify(parsedFlowData, null, 2)

    this.handleFlowDataChange(updatedFlowData)
  }

  handleFlowDataChange = (newValue) => {
    this.setState({flowData: newValue})

    try {
      newValue = JSON.parse(newValue)
      this.setState({error: null})
    } catch (e) {
      this.setState({error: e})
      return;
    }

    const listOfSchemasToLoad = {}
    const schemaData = {}
    for (let i = 0; i < newValue.nodes.length; i++) {
      const schemaToLoad = newValue.nodes[i].class
      listOfSchemasToLoad[i] = this.state.schemaList[schemaToLoad]
      schemaData[i] = newValue.nodes[i]
    }
    const displaySchema = { title: newValue.name, type: 'object', properties: listOfSchemasToLoad}

    this.setState({displaySchema, schemaData})
  }

  render() {
    const { flowData, displaySchema, schemaData, error } = this.state

    let jsonSchemaForm = null
    if (displaySchema && !error) {
      jsonSchemaForm = <JsonSchemaForm
        schema={displaySchema}
        formData={schemaData}
        onChange={this.handleSchemaChange}/>
    }

    let errorMessage = null
    if (error) errorMessage = <Message type="error"><strong>Error:</strong> {error.message}</Message>

    return <div>
      {errorMessage}

      <h3>Flow Data</h3>
      <AceEditor
        mode="javascript"
        theme="github"
        onChange={this.handleFlowDataChange}
        name="flowData"
        minLines={30}
        width="900px"
        value={flowData}
        editorProps={{$blockScrolling: true}}
      />

      <h3>Schema Output</h3>
      {jsonSchemaForm}
    </div>
  }
}

/** @jsx React.DOM **/
ArtifactList = React.createClass({
    getInitialState: function(){
        return { loaded: false };
    },
    loadArtifacts: function(){
        var self = this;
        GiddyUp.fetchArtifacts(this.props.test_result,
                               function(artifacts){
                                   self.setState({ loaded: true });
                               });
    },
    componentDidMount: function(){
        if(this.props.active){
            this.loadArtifacts();
        }
    },
    componentWillReceiveProps: function(nextProps){
        if(nextProps.active && !this.state.loaded)
            this.loadArtifacts();
    },
    render: function(){
        var active = this.props.active,
            loaded = this.state.loaded,
            showing = this.props.showing,
            artifacts = this.props.test_result.artifacts,
            friendlyUrl = this.props.friendlyUrl;
        if(active && loaded){
            var list = artifacts.map(function(a){
                return <ArtifactLink showing={showing}
                        key={a.id} artifact={a} friendlyUrl={friendlyUrl}/>;
            });
            return <ul className="nav nav-list">{list}</ul>;
        } else {
            return <span />;
        }
    }
});

ArtifactLink = React.createClass({
    render: function(){
        var artifact = this.props.artifact,
            showing = this.props.showing,
            active = (showing.artifact_id === artifact.id.toString()),
            klass = (active) ? "active" : "",
            friendlyUrl = this.props.friendlyUrl,
            url;
        url = '#' + routie.lookup('artifact',
                                  {project_id: showing.project_id,
                                   scorecard_id: showing.scorecard_id,
                                   test_instance_id: friendlyUrl,
                                   test_result_id: showing.test_result_id,
                                   artifact_id: artifact.id});
        return (<li className={klass}>
                  <a href={url}>
                    <MediaIcon ctype={artifact.content_type} />
                    {shortPath(artifact.url)}
                  </a>
                </li>);
    }
});


MediaIcon = React.createClass({
    render: function(){
        var ctype = this.props.ctype,
            type = ctype.toString().split(";")[0].trim().split("/"),
            major = type[0],
            minor = type[1],
            icon;

        if(major === 'image'){
            icon = 'icon-picture';
        } else if(major === 'text') {
            if(minor === 'csv'){
                icon = 'icon-th';
            } else {
                icon = 'icon-pencil';
            }
        } else {
            icon = 'icon-file';
        }
        return (<i className={icon} />);
    }
});

ArtifactDisplay = React.createClass({
    render: function(){
        var showing = this.props.showing;
        if(!showing.artifact_id){
            return (<div className="span9 well">Select a test artifact to view its contents.</div>);
        } else {
            return (<div className="span9">durrrr</div>);
        }
    }
});

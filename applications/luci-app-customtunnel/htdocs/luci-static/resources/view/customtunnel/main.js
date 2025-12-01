
'use strict';
'require form';
'require rpc';

var callCustomBackend = rpc.declare({
    object: 'luci.customtunnel',
    method: 'startTunnel',
    params: ['config']
});

return L.view.extend({
    load: function() {
        return Promise.all([
            L.uci.load('sshtunnel')
        ]);
    },
    render: function(data) {
        var m, s, o;

        m = new form.Map('sshtunnel', _('Custom SSH Tunnel'), _('Configure SSH tunnel with custom payload and proxy.'));

        s = m.section(form.TypedSection, 'tunnel', _('Tunnel Settings'));
        s.addremove = true;
        s.anonymous = true;

        o = s.option(form.Value, 'host', _('SSH Host'));
        o.rmempty = false;

        o = s.option(form.Value, 'port', _('SSH Port'));
        o.datatype = 'port';
        o.default = '22';

        o = s.option(form.Value, 'proxy', _('HTTP Proxy (host:port)'));
        o.placeholder = 'proxy.example.com:8080';

        o = s.option(form.TextValue, 'payload', _('Custom Payload'));
        o.rows = 5;
        o.description = _('Custom HTTP request for injection, e.g., CONNECT [host_port] HTTP/1.1\\r\\nHost: example.com\\r\\nCustom-Header: value\\r\\n');

        s.option(form.Button, '_start', _('Start Tunnel')).inputtitle = _('Apply and Start');
        s.option(form.Button, '_start').inputstyle = 'apply';
        s.option(form.Button, '_start').onclick = function() {
            return this.map.save(null, true).then(function() {
                return L.ui.showModal(_('Starting Tunnel...'), [
                    L.dom.content(L.ui.spinner()),
                    L.dom.elem('p', {}, _('Please wait while the tunnel starts.'))
                ]).then(function() {
                    return callCustomBackend({config: this.map.data});
                }.bind(this));
            }.bind(this));
        };

        return m.render();
    }
});

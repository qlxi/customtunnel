
m = Map("sshtunnel", translate("Custom SSH Tunnel Config"))

s = m:section(TypedSection, "tunnel", translate("Tunnel Settings"))
s.addremove = true
s.anonymous = true

o = s:option(Value, "host", translate("SSH Host"))
o.rmempty = false

o = s:option(Value, "port", translate("SSH Port"))
o.datatype = "port"
o.default = "22"

o = s:option(Value, "proxy", translate("HTTP Proxy (host:port)"))
o.placeholder = "proxy.example.com:8080"

o = s:option(TextValue, "payload", translate("Custom Payload"))
o.rows = 5
o.description = translate("Custom HTTP request for injection, e.g., CONNECT [host_port] HTTP/1.1\\r\\nHost: example.com\\r\\nCustom-Header: value\\r\\n")

return m

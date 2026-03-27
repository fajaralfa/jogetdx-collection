package id.fajaralfa.joget.websocket;

import java.util.Map;

import org.joget.commons.util.LogUtil;
import org.joget.plugin.base.DefaultApplicationPlugin;
import org.joget.plugin.base.PluginWebSocket;

import jakarta.websocket.Session;

public class Example extends DefaultApplicationPlugin implements PluginWebSocket {
    @Override
    public void onOpen(Session session) {
        LogUtil.info(getClassName(), "connection opened: " + session.getId());
    }

    @Override
    public void onMessage(String arg0, Session arg1) {
        LogUtil.info(getClassName(), "message received: " + arg1.getId());
        
    }
    @Override
    public void onClose(Session session) {
        LogUtil.info(getClassName(), "connection closed: " + session.getId());
    }

    @Override
    public Object execute(Map arg0) {
        return null;
    }

    @Override
    public String getClassName() {
        return getClass().getName();
    }

    @Override
    public String getName() {
        return "Websocket Example";
    }

    @Override
    public String getDescription() {
        return getName();
    }

    @Override
    public String getLabel() {
        return getName();
    }

    @Override
    public String getVersion() {
        return "0.0.1";
    }

    @Override
    public String getPropertyOptions() {
        return "";
    }
}

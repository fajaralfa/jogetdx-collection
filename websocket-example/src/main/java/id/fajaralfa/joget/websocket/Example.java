package id.fajaralfa.joget.websocket;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

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
    public void onMessage(String message, Session session) {
        LogUtil.info(getClassName(), "message received: " + session.getId());
        LogUtil.info(getClassName(), "content: " + message);
        Set<Session> openSessions = session.getOpenSessions();
        for (Session s : openSessions) {
            Future<Void> sendText = s.getAsyncRemote().sendText(message);
            try {
                sendText.get();
            } catch (InterruptedException e) {
                LogUtil.error(getClassName(), e, e.getMessage());
            } catch (ExecutionException e) {
                LogUtil.error(getClassName(), e, e.getMessage());
            }
        }
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

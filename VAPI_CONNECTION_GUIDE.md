# VAPI Connection Troubleshooting Guide

## Changes Made

### 1. Button Text Updated
- Changed "Call" to "Connect"
- Changed "End" to "Disconnect"
- Changed loading state to "Connecting..."

### 2. Improved Error Handling
- Better error messages for different failure scenarios
- Token validation before connection attempt
- Network error detection
- Configuration error handling

### 3. Enhanced VAPI Initialization
- Proper token validation
- Better logging for debugging
- Client-side only initialization
- Graceful fallback for missing token

### 4. Updated Assistant Configurations
- More professional system prompts
- Better conversation flow
- Clear interview structure
- Improved voice settings

## How to Test VAPI Connection

### Step 1: Verify Environment Variables
Check that `.env.local` contains:
```bash
NEXT_PUBLIC_VAPI_WEB_TOKEN="your-vapi-token-here"
```

### Step 2: Restart Development Server
After any .env changes:
```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

### Step 3: Test Connection
1. Go to Quick Practice page: `/interview`
2. Click "Connect" button
3. Check browser console for logs
4. Allow microphone access when prompted

### Step 4: Check Console Logs
Look for these messages:
```
✓ VAPI Token Status: Present
✓ Starting VAPI connection...
✓ Using assistant config: Quick Practice Assistant
✓ VAPI connection established
✓ Call started successfully
```

## Common Issues & Solutions

### Issue 1: "VAPI token is missing"
**Cause**: Environment variable not set or not loaded

**Solution**:
1. Check `.env.local` file exists
2. Verify `NEXT_PUBLIC_VAPI_WEB_TOKEN` is set
3. Restart development server
4. Clear browser cache

### Issue 2: "Failed to connect"
**Cause**: Network issues or invalid token

**Solution**:
1. Check internet connection
2. Verify VAPI token is valid
3. Check VAPI dashboard for account status
4. Try different browser

### Issue 3: Microphone not working
**Cause**: Browser permissions not granted

**Solution**:
1. Click lock icon in address bar
2. Allow microphone access
3. Refresh the page
4. Try again

### Issue 4: No response from AI
**Cause**: Assistant configuration issue

**Solution**:
1. Check console for errors
2. Verify OpenAI API is accessible
3. Check VAPI account credits
4. Contact VAPI support

### Issue 5: Connection drops immediately
**Cause**: Configuration or credit issues

**Solution**:
1. Check VAPI account has credits
2. Verify assistant configuration
3. Check browser console for errors
4. Try simpler configuration

## Testing Checklist

Before reporting issues, verify:

- [ ] Environment variable is set correctly
- [ ] Development server was restarted after .env changes
- [ ] Browser has microphone permissions
- [ ] Internet connection is stable
- [ ] VAPI account has credits
- [ ] No console errors before clicking Connect
- [ ] Browser is supported (Chrome, Edge, Firefox)
- [ ] No ad blockers interfering
- [ ] HTTPS is used (required for microphone)

## Debug Mode

To enable detailed logging:

1. Open browser console (F12)
2. Click "Connect" button
3. Watch for these events:
   - Token validation
   - Connection attempt
   - Call start
   - Message events
   - Speech events

## VAPI Account Requirements

Ensure your VAPI account has:
- Valid API token
- Sufficient credits
- OpenAI integration enabled
- Deepgram transcription enabled
- PlayHT voice enabled

## Browser Requirements

Supported browsers:
- Chrome 80+
- Edge 80+
- Firefox 75+
- Safari 13+

Required features:
- WebRTC support
- Microphone access
- Modern JavaScript (ES6+)

## Network Requirements

- Stable internet connection
- No restrictive firewall
- WebSocket support
- HTTPS connection (for microphone)

## Getting Help

If issues persist:

1. **Check Console**: Look for error messages
2. **Check Network Tab**: Look for failed requests
3. **Check VAPI Dashboard**: Verify account status
4. **Test with Simple Config**: Use minimal settings
5. **Contact Support**: Provide console logs

## Alternative Testing

If VAPI doesn't work, you can:
1. Use the personalized interview (text-based)
2. Check system status page
3. Test with different assistant config
4. Try on different device/network

## Success Indicators

Connection is working when you see:
- "Connect" button changes to "Disconnect"
- AI interviewer card shows speaking animation
- Transcript appears below
- Console shows "Call started successfully"
- You can hear the AI voice

## Configuration Files

Key files for VAPI:
- `lib/vapi.sdk.ts` - VAPI client initialization
- `constants/simple-vapi.ts` - Assistant configurations
- `components/Agent.tsx` - UI and connection logic
- `.env.local` - Environment variables

## Quick Fix Commands

```bash
# Restart development server
npm run dev

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Check environment variables
echo $NEXT_PUBLIC_VAPI_WEB_TOKEN
```

## Contact Information

For VAPI-specific issues:
- VAPI Documentation: https://docs.vapi.ai
- VAPI Support: support@vapi.ai
- VAPI Dashboard: https://dashboard.vapi.ai

For project issues:
- Check console logs
- Review this guide
- Test with minimal configuration
